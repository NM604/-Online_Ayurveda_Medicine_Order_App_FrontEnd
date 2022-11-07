import React from "react";
import Card from "../UI/Card";
import classes from "./OrderItem.module.css";
const OrderItem = (props) => {
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

  return (
    <li>
      <Card className={classes.item}>
        <div className={classes["item-details"]}>
          <div className={classes.id}>
            <span>OrderId</span>
            <h4>{props.id}</h4>
          </div>
          <div className={classes.info}>
            <div className={classes["info-price"]}>
              &#x20B9;{props.cost.toFixed(2)}
            </div>
            <div
              style={{
                backgroundColor: `${bg}`,
              }}
              className={classes["info-status"]}
            >
              {props.status}
            </div>
          </div>
        </div>
        <div className={classes["item-dates"]}>
          <span>{props.orderDate}</span>
          <span>{props.dispatchDate}</span>
        </div>
      </Card>
    </li>
  );
};

export default OrderItem;
