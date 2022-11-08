import React from "react";

const OrderProductDetailItem = (props) => {
  return (
    <div>
      <h2>{props.id}</h2>
      <h2>{props.medineName}</h2>
      <h2>{props.quantity}</h2>
      <h2>{props.price}</h2>
    </div>
  );
};

export default OrderProductDetailItem;
