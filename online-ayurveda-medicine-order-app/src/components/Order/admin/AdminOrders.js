import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminOrderItem from "./AdminOrderItem";
import { getSuggestedQuery } from "@testing-library/react";
import classes from "./AdminOrders.module.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState({});
  const [sq, setsq] = useState("");
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
  console.log(orders);

  const [filter, setfilter] = useState("Select Filter");
  function filterData(dt) {
    if (filter == "Select Filter" || dt == "") {
      fetchData();
    } else {
      let cp = [...orders];
      let rp = "";
      cp.sort((x) => {
        if (typeof x[filter] == "number") {
          rp = x[filter].toString();
        } else {
          rp = x[filter].toUpperCase();
        }
        console.log(rp.match(dt), rp, dt);
        if (rp.match(dt.toUpperCase())) {
          return -1;
        } else {
          return 1;
        }
      });
      console.log(cp);
      setOrders(cp);
    }
  }

  return (
    <section className={classes.order}>
      <h3>All Orders</h3>
      {error && <h1>{error.message}</h1>}
      {orders && (
        <ul>
          <div>
            <select value={filter} onChange={(e) => setfilter(e.target.value)}>
              <option>Select Filter</option>
              <option>orderDetailId</option>
              <option>totalCost</option>
              <option>orderStatus</option>
            </select>
            <input
              type="text"
              placeholder="search"
              value={sq}
              onChange={(e) => setsq(e.target.value)}
              onKeyUp={(e) => filterData(e.target.value)}
            />
          </div>
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
        </ul>
      )}
    </section>
  );
};

export default AdminOrders;
