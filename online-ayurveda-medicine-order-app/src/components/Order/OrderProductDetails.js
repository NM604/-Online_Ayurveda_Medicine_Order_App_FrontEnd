import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderProductDetailItem from "./OrderProductDetailItem";

const OrderProductDetails = () => {
  const [orderItem, setOrderItem] = useState([]);
  const [error, setError] = useState({});
  const { id } = useParams();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const data = await axios.get(
        "http://localhost:8080/oam/order-items/order-details/1"
      );
      const orderItems = await data.data;
      setOrderItem(orderItems);
    } catch (err) {
      setError(err);
    }
  };
  return (
    <div>
      <h3>Your Orders</h3>
      {error && <h1>{error.message}</h1>}
      {orderItem && (
        <ul>
          {orderItem.map((orderItem) => (
            <OrderProductDetailItem
              key={orderItem.orderItemId}
              medineName={orderItem.medicine.medicineName}
              quantity={orderItem.quantity}
              price={orderItem.price}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderProductDetails;
