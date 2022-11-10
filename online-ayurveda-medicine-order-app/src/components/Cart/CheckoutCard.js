import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { cartActions } from "../../store/cart";
import { useDispatch, useSelector } from "react-redux";
import classes from "./CheckoutCard.module.css";

function CheckoutCard(props) {
  const custId = localStorage.getItem("loggedId");
  const localStorageCart = JSON.parse(
    localStorage.getItem("cartItems")
  );
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
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
  const orderHandler = () => {
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
    <Card className={classes.card}>
      <Card.Body className={classes["card-body"]}>
        <Card.Title>Order Summary</Card.Title>
        <Card.Text>Total Price :{totalPrice}</Card.Text>
        <Button variant="primary" onClick={orderHandler}>
          Place order
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CheckoutCard;
