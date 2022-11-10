import React, { useEffect, useState } from "react";
import CardIcon from "../Cart/CartIcon";
import classes from "./CartButton.module.css";
import { useSelector } from "react-redux";

import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { grey, red } from "@mui/material/colors";
const CartButton = () => {
  const cartItems = useSelector(state=>state.cart.cartItems);
  //const [length,setLength]=useState();
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  return (
    <>
      <IconButton aria-label="cart">
        <StyledBadge badgeContent={cartItems.length} color="secondary">
          <ShoppingCartIcon sx={{ color: grey[50] }} fontSize="large" />
        </StyledBadge>
      </IconButton>
      {/* <button className={classes.button}>
        <span className={classes.icon}>
          <CardIcon />
        </span>
        <span className={classes.badge}>{cartItems.length}</span>
      </button> */}
    </>
  );
};

export default CartButton;
