import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import OrderItem from "./OrderItem";
import classes from './Orders.module.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const data = await axios.get(
        "http://localhost:8080/oam/order-details/customer/1"
      );
      const orderItems = await data.data;
      setOrders(orderItems);
    } catch (err) {
      console.log(err);
    }
  };
  return (
      <section className={classes.order}>
        <h3>Your Orders</h3>
        <ul>
          {orders.map((order) => (
            <OrderItem
              key={order.orderDetailId}
              id={order.orderDetailId}
              cost={order.totalCost}
              status={order.orderStatus}
              orderDate={order.orderDate}
              dispatchDate={order.dispatchDate}
            />
          ))}
        </ul>
      </section>
  );
};

export default Orders;
