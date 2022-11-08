import React from 'react'
import Card from '../UI/Card';

const CartProductItem = (props) => {
  return (
        <Card>
          <div>ID: {props.medicineId}</div>
          <div>Name: {props.medicineName}</div>
          <div>Quantity: {props.quantity}</div>
          <div>price: {props.price}</div>
        </Card>
      );
}

export default CartProductItem
