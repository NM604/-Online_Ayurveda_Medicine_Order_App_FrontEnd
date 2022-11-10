import React from "react";
import Card from "../UI/Card";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart";
import classes from "./CartProductItem.module.css";
import Button from "react-bootstrap/Button";
const CartProductItem = (props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const removeHandler = () => {
    dispatch(cartActions.removeItem(props.medicineId));
  };

  const increaseQtyHandler = () => {
    dispatch(cartActions.increaseQuantity(props.medicineId));
  };
  const decreaseQtyHandler = () => {
    dispatch(cartActions.decreaseQuantity(props.medicineId));
  };
  return (
    <tr>
      <td>{props.medicineId}</td>
      <td>{props.medicineName}</td>
      <td>
        <div className={classes["medicine-qty"]}>
          <Button variant="outline-dark" onClick={decreaseQtyHandler}>
            -
          </Button>
          <span>{props.quantity}</span>
          <Button variant="outline-dark" onClick={increaseQtyHandler}>
            +
          </Button>
        </div>
      </td>
      <td>{props.price}</td>
      <td>{props.quantity*props.price}</td>
      <td>
        <Button variant="danger" onClick={removeHandler}>
          remove
        </Button>
      </td>
    </tr>
  );
};

export default CartProductItem;
