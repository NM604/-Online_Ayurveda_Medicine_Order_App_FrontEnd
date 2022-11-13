import { useState } from "react";
import Card from "../../UI/Card";
import classes from "./OrderItem.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const OrderItem = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const cancelHandler = () => {
    updateStatus();
    setOpen(false);
    window.location.reload(false);
  };
  const updateStatus = async () => {
    try {
      const data = await axios.put(
        `http://localhost:8080/oam/order-details/cancel/${props.id}`,
        {
          orderDetailId: props.id,
        }
      );
      const orderItems = await data.data;
      console.log(orderItems);
    } catch (err) {
      console.log(err);
    }
  };

  let bg = "";
  switch (props.status) {
    case "CREATED":
      bg = "rgb(38, 110, 218)";
      break;
    case "CANCELLED":
      bg = "rgb(243, 29, 29)";
      break;
    case "COMPLETED":
      bg = "rgb(28, 217, 107)";
      break;
    default:
      bg = "white";
  }

  let isCreated = false;
  if (props.status === "CREATED") {
    isCreated = true;
  }

  return (
    <tr data-testid="order-row">
      <td>{props.id}</td>
      <td>{props.orderDate}</td>
      <td>{props.dispatchDate}</td>
      <td>{props.cost}</td>
      <td>
        <div
          style={{
            borderColor: `${bg}`,
            color: `${bg}`,
          }}
          className={classes["order-status"]}
        >
          {props.status}
        </div>
      </td>
      <td>
        {isCreated && (
          <>
            <Button
              aria-label="cancel-btn"
              variant="outline-danger"
              onClick={handleClickOpen}
            >
              Cancel
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Cancel order"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to cancel order?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>No,don't cancel</Button>
                <Button onClick={cancelHandler} autoFocus>
                  Yes, cancel
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </td>
      <td>
        <Link to={`/my-orders/${props.id}`}>
          <Button aria-label="detail-btn" variant="outline-info">
            Show details
          </Button>
        </Link>
      </td>
    </tr>
  );
};

export default OrderItem;
