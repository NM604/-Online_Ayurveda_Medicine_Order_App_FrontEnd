import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderProductDetailItem from "./OrderProductDetailItem";
import classes from "./OrderProductDetails.module.css";
//import Table from 'react-bootstrap/Table';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {fetchOrderMedicines} from './api/products'

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
      totPrice += item.quantity * item.price;
    });
    setProductSummary({
      totalQuantity: totQty,
      totalPrice: totPrice,
    });
  }, [orderItem]);
  const fetchData = async () => {
    try {
      const orderItems = await fetchOrderMedicines(id);
      setOrderItem(orderItems);
      setError();
    } catch (err) {
      setError(err);
    }
    // try {
    //   const data = await axios.get(
    //     `http://localhost:8080/oam/order-items/order-details/${id}`
    //   );
    //   const orderItems = await data.data;
    //   setOrderItem(orderItems);
    // } catch (err) {
    //   setError(err);
    // }
  };
  console.log(orderItem);
  return (
    <section
      data-testid="section"
      className={classes["order-product-container"]}
    >
      <div data-testid="medicine-details-header" className={classes["order-product-header"]}>
        <h1 data-testid="header">Ordered Products</h1>
      </div>
      <div className={classes["order-product-items"]}>
        <TableContainer sx={{ minWidth: 500, maxWidth: 600 }} component={Paper}>
          <Table
            stickyHeader
            sx={{ minWidth: 500, maxWidth: 600 }}
            aria-label="spanning table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Medicine name</TableCell>
                <TableCell align="center">Qty.</TableCell>
                <TableCell align="center">Unit price</TableCell>
                <TableCell align="center">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderItem.map((item) => (
                <TableRow key={item.orderItemId}>
                  <TableCell align="center">
                    {item.medicine.medicineName}
                  </TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="center">{item.price}</TableCell>
                  <TableCell align="center">{item.quantity*item.price}</TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Net Qty</TableCell>
                <TableCell align="center">
                  {productSummary.totalQuantity}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align="center">{productSummary.totalPrice}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </section>
  );
};

export default OrderProductDetails;
