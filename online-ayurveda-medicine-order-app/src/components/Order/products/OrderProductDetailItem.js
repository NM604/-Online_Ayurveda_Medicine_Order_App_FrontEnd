import React from "react";

const OrderProductDetailItem = (props) => {
  return (
    <tr>
      <td>{props.medineName}</td>
      <td>{props.quantity}</td>
      <td>{props.price}</td>
    </tr>
  );
};

export default OrderProductDetailItem;
