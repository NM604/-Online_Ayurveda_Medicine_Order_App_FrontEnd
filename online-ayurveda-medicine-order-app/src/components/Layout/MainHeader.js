import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./MainHeader.module.css";

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <nav>
        <div className={classes.brand}>
          <NavLink activeClassName={classes.active} to="/">
            <h2>Ayurveda</h2>
          </NavLink>
        </div>
        <div>
          <ul>
            <li>
                <NavLink activeClassName={classes.active} to="/medicines">
                Medicines
              </NavLink>
              
            </li>
            <li>
              <NavLink activeClassName={classes.active} to="/cart">
                Cart
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName={classes.active} to="/my-orders">
                MyOrders
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName={classes.active} to="/profile">
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
