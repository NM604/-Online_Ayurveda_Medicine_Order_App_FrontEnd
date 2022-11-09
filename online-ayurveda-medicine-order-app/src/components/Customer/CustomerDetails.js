import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { authActions } from "../../store/auth";
//import { save } from "../../store/cred";
import { useNavigate } from "react-router-dom";

const CustomerDetails = () => {
  const [CustomerDetails, setCustomerDetails] = useState({});
  const id = useSelector((state) => state.userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchCustomerDetails = () => {
    axios
      .get("http://localhost:8080/oam/userinterface/customers/3")
      .then((res) => {
        console.log(res);
        setCustomerDetails(res.data);
      });
  };

  const handleLogout = async () => {
    dispatch(authActions.logout());
    localStorage.setItem("isLoggedIn", "0");
    localStorage.removeItem("loggedId");
    navigate("/customer/login");
  };

  useEffect(() => {
    fetchCustomerDetails();
  }, []);

  //ondelete

  return (
    <div className="container">
      <div key={CustomerDetails.customerId}>
        <h1>Customer Details</h1>
        <p>ID : {CustomerDetails.customerId}</p>
        <p>Name : {CustomerDetails.customerName}</p>
        <p>Password : {CustomerDetails.customerPassword}</p>
      </div>

      <ul style={{ listStyle: "none" }}>
        <li>
          <button>
            <NavLink to="/updateCustomer"> Update Details </NavLink>
          </button>
        </li>
        <li>
          <button>
            <NavLink
              to="/deleteCustomer"
              onClick={() => alert("Do you want to delete your Account?")}
            >
              Delete Account{" "}
            </NavLink>
          </button>{" "}
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default CustomerDetails;
