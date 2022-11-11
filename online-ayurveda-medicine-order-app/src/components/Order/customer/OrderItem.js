import React from "react";
import Card from "../../UI/Card";
import classes from "./OrderItem.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";

const OrderItem = (props) => {
  const cancelHandler = () => {
    updateStatus();
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
    <tr>
      <td>{props.id}</td>
      <td>{props.orderDate}</td>
      <td>{props.dispatchDate}</td>
      <td>{props.cost}</td>
      <td>
        <div
          style={{
            borderColor: `${bg}`,
            color: `${bg}`
          }}
          className={classes["order-status"]}
        >
          {props.status}
        </div>
      </td>
      <td>
        {isCreated && (
          <Button variant="outline-danger" onClick={cancelHandler}>
            Cancel
          </Button>
        )}
      </td>
      <td>
        <Link to={`/my-orders/${props.id}`}>
          <Button variant="outline-info">Show details</Button>
        </Link>
      </td>
    </tr>
  );
};

export default OrderItem;
