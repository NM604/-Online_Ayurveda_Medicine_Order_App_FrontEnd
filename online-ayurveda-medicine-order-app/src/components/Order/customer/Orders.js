import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import OrderItem from "./OrderItem";
import classes from "./Orders.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store/auth";
import Table from "react-bootstrap/Table";
import ErrorCard from "../../UI/ErrorCard";
import { fetchCustomerOrder } from "./api/orders";

const Orders = () => {
  const custId = localStorage.getItem("loggedId");
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const orderItems = await fetchCustomerOrder(custId);
      console.log("Suc");
      setOrders(orderItems);
      setError();
    } catch (err) {
      console.log("err");
      setError(err);
    }
    // if(orderItems.orderDetailId){
    //   setOrders(orderItems);
    //   setError();
    // }else{
    //   setError(orderItems);
    // }
    // try {
    //   const data = await axios.get(
    //     `http://localhost:8080/oam/order-details/customer/${custId}`
    //   );
    //   const orderItems = await data.data;
    //   console.log(orderItems);
    //   setOrders(orderItems);
    //   setError();
    // } catch (err) {
    //   setError(err);
    // }
  };
  return (
    <section className={classes["order-container"]}>
      <div data-testid="order-header" className={classes["order-header"]}>
        <h1>My Orders</h1>
      </div>
      {error && <ErrorCard data-testid="order-error" error={error} />}
      {!error && (
        <div data-testid="orders-list" className={classes["order-items"]}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Order id</th>
                <th>Order date</th>
                <th>Dispatch date</th>
                <th>Price</th>
                <th>Status</th>
                <th>Cancel</th>
                <th>Show details</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 && (
                <tr>
                  <td colSpan="4">
                    <h4>Your order is empty</h4>
                  </td>
                </tr>
              )}
              {orders.map((order) => (
                <OrderItem
                  data-testid="order-item"
                  key={order.orderDetailId}
                  id={order.orderDetailId}
                  cost={order.totalCost}
                  status={order.orderStatus}
                  orderDate={order.orderDate}
                  dispatchDate={order.dispatchDate}
                />
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </section>
  );
};

export default Orders;
