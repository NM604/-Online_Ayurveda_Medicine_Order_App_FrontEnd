import React from "react";
import Card from "../UI/Card";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart";
import classes from "./CartProductItem.module.css";
import Button from "react-bootstrap/Button";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const CartProductItem = (props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removeHandler = () => {
    dispatch(cartActions.removeItem(props.medicineId));
    setOpen(false);
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
      <td>{props.quantity * props.price}</td>
      <td>
        <Button variant="danger" onClick={handleClickOpen}>
          Remove
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Do you want to remove this item from shopping cart?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={removeHandler} autoFocus>
              Remove
            </Button>
          </DialogActions>
        </Dialog>
      </td>
    </tr>
  );
};

export default CartProductItem;
