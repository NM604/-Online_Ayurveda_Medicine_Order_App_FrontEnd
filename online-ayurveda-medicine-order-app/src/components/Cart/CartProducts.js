import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../UI/Card";
import CartProductItem from "./CartProductItem";
import axios from "axios";
import { cartActions } from "../../store/cart";

const CartProducts = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log(cartItems);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let sum = 0;
    cartItems.map((item) => {
      sum += item.price * item.quantity;
    });
    setTotalPrice(sum);
  }, []);

  const formatDate =(date)=>{
    return date.toISOString().split("T")[0]
  }

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
      const orderDetailId = await postData("http://localhost:8080/oam/order-details",orderDetailItem);
      cartItems.map((item) => {
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
        postData("http://localhost:8080/oam/order-items",orderItem);
      });
    })();

    dispatch(cartActions.clearCart());
    setTotalPrice(0);
  };

  const postData =async (url,data)=>{
    try {
      const res = await axios.post(
        url,
        data
      );
      const id = await res.data;
      return id;
    } catch (e) {
      console.log(e);
    }
  }

  // const postOrderDetail = async (orderDetailItem) => {
  //   try {
  //     const res = await axios.post(
  //       "http://localhost:8080/oam/order-details",
  //       orderDetailItem
  //     );
  //     const id = await res.data;
  //     return id;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const postOrderItem = async (orderItem) => {
  //   try {
  //     const res = await axios.post(
  //       "http://localhost:8080/oam/order-items",
  //       orderItem
  //     );
  //     console.log(res.data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };


  return (
    <div>
      <h1>Your Cart</h1>
      <h2>Total Price is {totalPrice}</h2>
      <button onClick={orderHandler}>Place Order</button>
      <ul>
        {cartItems.map((item) => (
          <CartProductItem
            medicineId={item.medicineId}
            medicineName={item.medicineName}
            quantity={item.quantity}
            price={item.price}
          />
        ))}
      </ul>
    </div>
  );
};

export default CartProducts;
