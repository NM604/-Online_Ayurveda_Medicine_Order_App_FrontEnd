import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../UI/Card";
import CartProductItem from "./CartProductItem";
import axios from "axios";
import { cartActions } from "../../store/cart";
import classes from "./CartProducts.module.css";
import Table from "react-bootstrap/Table";
import CheckoutCard from "./CheckoutCard";
const CartProducts = () => {
  //console.log(localStorage.getItem("cartItems"));
  const localStorageCart = JSON.parse(
    localStorage.getItem("cartItems")
  );
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    updateTotalPrice();
  }, []);

  useEffect(() => {
    updateTotalPrice();
  }, [localStorageCart]);

  const updateTotalPrice = () => {
    let sum = 0;
    localStorageCart.map((item) => {
      sum += item.price * item.quantity;
    });
    setTotalPrice(sum);
  };
  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const orderHandler = () => {
    let ordDate = new Date();
    let disDate = new Date();
    disDate.setDate(disDate.getDate() + 7);
    ordDate = formatDate(ordDate);
    disDate = formatDate(disDate);

    const orderDetailItem = {
      customer: {
        customerId: 1,
      },
      dispatchDate: disDate,
      orderDate: ordDate,
      totalCost: totalPrice,
    };

    (async () => {
      //const orderDetailId = await postOrderDetail(orderDetailItem);
      const orderDetailId = await postData(
        "http://localhost:8080/oam/order-details",
        orderDetailItem
      );
      localStorageCart.map((item) => {
        const orderItem = {
          medicine: {
            medicineId: item.medicineId,
          },
          orderDetail: {
            orderDetailId: orderDetailId,
          },
          price: item.price,
          quantity: item.quantity,
        };

        //postOrderItem(orderItem);
        postData("http://localhost:8080/oam/order-items", orderItem);
      });
    })();

    dispatch(cartActions.clearCart());
    setTotalPrice(0);
  };

  const postData = async (url, data) => {
    try {
      const res = await axios.post(url, data);
      const id = await res.data;
      return id;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={classes["cart-container"]}>
      <div data-testid="cart-header" className={classes["cart-header"]}>
        <h1>My shopping cart</h1>
      </div>
      <div className={classes["cart-body"]}>
        <div className={classes["cart-items"]}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Medicine id</th>
                <th>Medicine name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Sub total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {localStorageCart.length === 0 && (
                <tr>
                  <td colSpan="6">
                    <h4>Your cart is empty</h4>
                  </td>
                </tr>
              )}
              {localStorageCart.map((item) => (
                <CartProductItem
                  key={item.medicineId}
                  medicineId={item.medicineId}
                  medicineName={item.medicineName}
                  quantity={item.quantity}
                  price={item.price}
                />
              ))}
            </tbody>
          </Table>
        </div>
        <div className={classes["cart-price"]}>
          <CheckoutCard totalPrice={totalPrice} />
        </div>
      </div>
    </div>
  );
};

export default CartProducts;
