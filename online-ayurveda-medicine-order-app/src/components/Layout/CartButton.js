import React from "react";
import CardIcon from "../Cart/CartIcon";
import classes from "./CartButton.module.css";
import { useSelector } from "react-redux";
const CartButton = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  return (
    <button className={classes.button}>
      <span className={classes.icon}>
        <CardIcon />
      </span>
      <span className={classes.badge}>{cartItems.length}</span>
    </button>
  );
};

export default CartButton;
