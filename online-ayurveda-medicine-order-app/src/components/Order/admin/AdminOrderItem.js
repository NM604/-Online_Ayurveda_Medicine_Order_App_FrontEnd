import { Fragment, useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import Card from "../../UI/Card";
import { UpdateOrderPopup } from "./Popup.js";
import Popup from "./Popup.js";
import classes from "./AdminOrderItem.module.css";

const AdminOrderItem = (props) => {
  const [buttonPopup, setButtonPopup] = useState(false);

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

  const [orders, setOrders] = useState([]);
  const [error, setError] = useState({});


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
              color: `${bg}`,
            }}
            className={classes["order-status"]}
          >
            {props.status}
          </div>
        </td>
        <td>{props.customerId}</td>
        <td>
          <button
            className={classes["info-status"]}
            style={{ color: "white" }}
            onClick={() => setButtonPopup(true)}
          >
            {" "}
            UPDATE ORDER
          </button>
          <Popup
            prop={props}
            trigger={buttonPopup}
            setTrigger={setButtonPopup}
          />
        </td>
      </tr>
  );
};

export default AdminOrderItem;
