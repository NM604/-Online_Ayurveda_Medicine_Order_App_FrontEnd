import React, { useState, useEffect } from "react";
import backendAPI from "../../apis/backendAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import { NavLink } from "react-router-dom";

function Admin() {
  const auth = useSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(authActions.logout());
    navigate("/admin/login");
  };

  const handleUpdatePassword = () => {};

  console.log(auth);
  return (
    <div className="container">
      <h1>Management Services</h1>
      <ul style={{ listStyle: "none" }}>
        <li>
          <NavLink to="/managemeds">Medicine Management</NavLink>
        </li>
        <li>
          <NavLink to="/manageorders">Order Management</NavLink>
        </li>
        <li>
          <NavLink to="/managecustomer">Customer Management</NavLink>
        </li>
        <li>
          <NavLink to="">Change Password</NavLink>
        </li>
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Admin;
