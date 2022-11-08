import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import OrderItem from "./OrderItem";
import classes from './Orders.module.css';
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

const Orders = () => {
  // const dispatch =useDispatch();
  // const auth =useSelector(state=>state.auth.isAuth)
  // console.log(auth);
  // dispatch(authActions.login())
  const [orders, setOrders] = useState([]);
  const [error,setError] =useState({});
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
      setError(err);
    }
  };
  return (
      <section className={classes.order}>
        <h3>Your Orders</h3>
        {error && <h1>{error.message}</h1>}
        {orders && <ul>
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
        </ul>}
        
      </section>
  );
};

export default Orders;
