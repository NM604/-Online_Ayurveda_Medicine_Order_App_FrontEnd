import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart";
import backendAPI from "../../apis/backendAPI";


import classes from "./MedicineListing.module.css";

const MedicineLIstingItem = (props) => {
  const { medicineId, medicineName, medicineCost, companyName } = props;
  const [quantity, setQuantity] = useState();
  const medItem = {
    medicineId: medicineId,
    medicineName: medicineName,
    quantity: quantity,
    price: medicineCost,
  };
  const [cartError, setCartError] = useState();
  const dispatch = useDispatch();
  const cartHandler = (item) => {
    if (!quantity) {
      setCartError("Choose a quantity");
    } else {
      setCartError();
      dispatch(cartActions.addItem(item));
      setQuantity(1)
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.product} key={medicineId}>
        <Card className={classes.card} sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image="https://picsum.photos/200"
          />
          <CardContent>
            <Typography
              align="center"
              gutterBottom
              variant="h4"
              component="div"
            >
              {medicineName}
            </Typography>
            <Typography align="center" variant="body2" color="text.secondary">
              By {companyName}
            </Typography>
            <Typography align="center" variant="h6" color="text.secondary">
              ₹ {medicineCost}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("Submitted");
                  cartHandler(medItem);
                }}
              >
                <div className={classes.inpurField}>
                  <input
                    className={classes.input}
                    onChange={(e) => setQuantity(e.target.value)}
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    name="qty"
                    min="1"
                  />
                  <Button style={{textTransform:"none"}} variant="contained" type="submit">
                    Add to cart
                  </Button>
                </div>
                <span style={{color:"red",textTransform:"none"}}>{cartError}</span>
              </form>
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default MedicineLIstingItem;
