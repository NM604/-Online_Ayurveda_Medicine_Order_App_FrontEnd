import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./MainHeader.module.css";
import CartIcon from "../Cart/CartIcon";
import CartButton from "./CartButton";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useSelector } from "react-redux";
import { userActions } from "../../store/user";

const MainHeader = () => {
  //const [isAuth,setAuth] = useState();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = localStorage.getItem("loggedType");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  //console.log(user==='admin');
  // useEffect(()=>{
  //   setAuth(localStorage.getItem("isLoggedIn"))
  // },[localStorage.getItem("isLoggedIn")])
  // const isAuth = localStorage.getItem("isLoggedIn");
  return (
    <header className={classes.header}>
      <nav>
        <div className={classes.brand}>
          <NavLink to="/">
            <h2>Ayurveda</h2>
          </NavLink>
        </div>
        {isLoggedIn==='1' && (
          <div>
            <ul>
              {user === "admin" && (
                <>
                  <li>
                    <NavLink to="/medicines">Medicines</NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin/orders">Orders</NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin">Profile</NavLink>
                  </li>
                </>
              )}
              {user === "customer" && (
                <>
                  <li>
                    <NavLink to="/medicines">Medicines</NavLink>
                  </li>
                  <li>
                    <NavLink to="/cart">
                      <CartButton />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/my-orders">MyOrders</NavLink>
                  </li>
                  <li>
                    <NavLink to="/customer">Profile</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default MainHeader;
