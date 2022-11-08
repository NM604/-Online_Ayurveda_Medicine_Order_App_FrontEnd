import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./MainHeader.module.css";

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <nav>
        <div className={classes.brand}>
          <NavLink to="/">
            <h2>Ayurveda</h2>
          </NavLink>
        </div>
        <div>
          <ul>
            <li>
              <NavLink to="/medicines">
                Medicines
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart">
                Cart
              </NavLink>
            </li>
            <li>
              <NavLink to="/my-orders">
                MyOrders
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile">
                Profile
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default MainHeader;
