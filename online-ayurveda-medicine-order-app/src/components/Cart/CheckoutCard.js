import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { cartActions } from "../../store/cart";
import { useDispatch, useSelector } from "react-redux";
import classes from "./CheckoutCard.module.css";
import { Link } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function CheckoutCard(props) {
  const custId = localStorage.getItem("loggedId");
  const localStorageCart = JSON.parse(localStorage.getItem("cartItems"));
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

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

  const handleClickOpen = () => {
    if (totalPrice === 0) {
      setError("Cart is empty");
    }
    if (totalPrice != 0) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const orderHandler = () => {
    
    if (totalPrice != 0) {
      let ordDate = new Date();
      let disDate = new Date();
      disDate.setDate(disDate.getDate() + 7);
      ordDate = formatDate(ordDate);
      disDate = formatDate(disDate);

      const orderDetailItem = {
        customer: {
          customerId: custId,
        },
        dispatchDate: disDate,
        orderDate: ordDate,
        totalCost: totalPrice,
      };

      (async () => {
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
      setError("");
    }
    setOpen(false);
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
    <Card data-testid="card" className={classes.card}>
      <Card.Body className={classes["card-body"]}>
        <Card.Title>Order Summary</Card.Title>
        <Card.Text>Total Price :{totalPrice}</Card.Text>
        <Link to="/my-orders">
          <Button className={classes.btn} variant="outline-primary">
            View orders
          </Button>
        </Link>
        <Button
          className={classes.btn}
          variant="primary"
          onClick={handleClickOpen}
        >
          Checkout
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Confirm order"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Confirm order by clicking 'Confirm' button
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={orderHandler} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        <Card.Text style={{ color: "red" }}>{error}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CheckoutCard;
