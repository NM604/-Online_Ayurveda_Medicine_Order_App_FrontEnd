import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminOrderItem from "./AdminOrderItem";
import { getSuggestedQuery } from "@testing-library/react";
import classes from "./AdminOrders.module.css";
import Table from "react-bootstrap/Table";
import AdminOrderTable from "./AdminOrderTable";
import ErrorCard from "../../UI/ErrorCard";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState();
  const [sq, setsq] = useState("");

  const [filter, setfilter] = useState("Select Filter");

  useEffect(() => {
    if (filter == "Select Filter") {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const data = await axios.get(`http://localhost:8080/oam/order-details`);
      const resj = await data.data;
      setOrders(resj);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    console.log("change" + sq);
    filterData(sq);
  }, [sq]);

  function filterData(dt) {
    if (filter == "Select Filter" || dt == "") {
      fetchData();
    } else {
      let cp = [...orders];
      let rp = "";
      const filteredOrders = cp.filter((x) => {
        console.log(x);
        if (filter === "customerId") {
          rp = x.customer.customerId.toString();
        } else if (typeof x[filter] == "number") {
          rp = x[filter].toString();
        } else {
          rp = x[filter].toUpperCase();
        }

        //console.log(rp.match(dt), rp, dt);
        if (rp.match(dt.toUpperCase())) {
          return true;
        } else {
          return false;
        }
      });

      // cp.sort((x) => {
      //   if (typeof x[filter] == "number") {
      //     rp = x[filter].toString();
      //   } else {
      //     rp = x[filter].toUpperCase();
      //   }
      //   //console.log(rp.match(dt), rp, dt);
      //   if (rp.match(dt.toUpperCase())) {
      //     return -1;
      //   } else {
      //     return 1;
      //   }
      // });
      //console.log(cp);
      setOrders(filteredOrders);
    }
  }

  return (
    <section className={classes["admin-order-container"]}>
      <h3>All Orders</h3>
      {error && <h1>{error.message}</h1>}
      {error && <ErrorCard />}
      {!error && (
        <div className={classes["admin-order-items"]}>
          <div className={classes["filter-form"]}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filter}
              label="Select"
              onChange={(e) => setfilter(e.target.value)}
            >
              <MenuItem value="Select Filter">Select Filter</MenuItem>
              <MenuItem value="orderDetailId">Order id</MenuItem>
              <MenuItem value="totalCost">Total Cost</MenuItem>
              <MenuItem value="orderStatus">Status</MenuItem>
              <MenuItem value="customerId">Customer id</MenuItem>
            </Select>
            <TextField
              value={sq}
              onChange={(e) => setsq(e.target.value)}
              id="outlined-basic"
              label={filter}
              variant="outlined"
            />
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Order id</th>
                <th>Order date</th>
                <th>Dispatch date</th>
                <th>Price</th>
                <th>Status</th>
                <th>Customer id</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 && (
                <tr>
                  <td colSpan="7">
                    <h4>No orders to display</h4>
                  </td>
                </tr>
              )}
              {orders.map((order) => (
                <AdminOrderItem
                  key={order.orderDetailId}
                  id={order.orderDetailId}
                  cost={order.totalCost}
                  status={order.orderStatus}
                  orderDate={order.orderDate}
                  dispatchDate={order.dispatchDate}
                  customerId={order.customer.customerId}
                  customer={order.customer}
                  // customerId={order.customerId}
                  fetchData={fetchData}
                />
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </section>
  );
};

export default AdminOrders;
