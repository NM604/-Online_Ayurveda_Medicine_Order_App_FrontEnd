import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderProductDetailItem from "./OrderProductDetailItem";
import classes from "./OrderProductDetails.module.css";
import Table from 'react-bootstrap/Table';

const OrderProductDetails = () => {
  const [orderItem, setOrderItem] = useState([]);
  const [error, setError] = useState({});
  const [productSummary, setProductSummary] = useState({
    totalQuantity: 0,
    totalPrice: 0,
  });
  const { id } = useParams();
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let totQty = 0;
    let totPrice = 0;
    orderItem.map((item) => {
      totQty += item.quantity;
      totPrice += item.quantity*item.price;
    });
    setProductSummary({
      totalQuantity: totQty,
      totalPrice: totPrice,
    });
  }, [orderItem]);
  const fetchData = async () => {
    try {
      const data = await axios.get(
        `http://localhost:8080/oam/order-items/order-details/${id}`
      );
      const orderItems = await data.data;
      setOrderItem(orderItems);
    } catch (err) {
      setError(err);
    }
  };
  console.log(orderItem);
  return (
    <section className={classes["order-product-container"]}>
      <div className={classes["order-product-header"]}>
        <h1>Ordered Products</h1>
      </div>
      <div className={classes["order-product-items"]}>
      <Table striped bordered hover>
          <thead>
            <tr>
              <th>Medicine name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orderItem.map((item) => (
              <OrderProductDetailItem
                key={item.orderItemId}
                medineName={item.medicine.medicineName}
                quantity={item.quantity}
                price={item.price}
              />
            ))}
            <tr>
              <td></td>
              <td>Total Qty: {productSummary.totalQuantity}</td>
              <td>Total price: {productSummary.totalPrice}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </section>
  );
};

export default OrderProductDetails;
