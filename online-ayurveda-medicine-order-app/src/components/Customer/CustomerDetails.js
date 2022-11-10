import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { authActions } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import CustomerUpdateUtil from "./CustomerUpdateUtil";
import backendAPI from "../../apis/backendAPI";
import "../../CSS/profile.css";

const CustomerDetails = () => {
  const [CustomerDetails, setCustomerDetails] = useState({});
  const id = useSelector((state) => state.userId);
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState();
  const [userId, setUserId] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchCustomerDetails = () => {
    axios
      .get(`http://localhost:8080/oam/userinterface/customers/${userId}`)
      .then((res) => {
        console.log(res);
        setCustomerDetails(res.data);
      });
  };

  const handleLogout = async () => {
    dispatch(authActions.logout());
    navigate("/customer/login");
  };

  useEffect(() => {
    const storedUserLoggedInfo = localStorage.getItem("isLoggedIn");
    setUserId(localStorage.getItem("loggedId"));
    if (storedUserLoggedInfo === "0") {
      navigate("/customer/login");
    }
    //setUserId(localStorage.getItem("loggedId"));
    fetchCustomerDetails();
  }, [userId]);

  const handleDelete = async () => {
    const data = await backendAPI
      .delete(`/oam/userinterface/customers/${userId}`)
      .then((response) => {
        setResponse(response.data);
        dispatch(authActions.logout());
        navigate("/customer/login");
      })
      .catch((error) => {
        setResponse(error.response.data.errorMessage);
      });
  };

  return (
    <div className="container" >
      <div key={CustomerDetails.customerId} className="cust">
        <h1>Customer Details
        </h1><br/>
        <h5 className="details">ID : {CustomerDetails.customerId}</h5>
        <h5 className="details">Name : {CustomerDetails.customerName}</h5>
        <h5 className="details">Password : {CustomerDetails.customerPassword}</h5>
      </div>

      <Button variant="danger" onClick={handleDelete} id="btn">
        Delete Account
      </Button>
      <div className="buttons">
        <Button
          variant="warning"
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
          id="btn1"
        >
          Update Password
        </Button>
      </div>
      <Collapse in={open}>
        <div id="example-collapse-text">
          <CustomerUpdateUtil />
        </div>
      </Collapse>
      <Button variant="primary" onClick={handleLogout} id="btn2">
        Logout
      </Button>
    </div>
  );
};

export default CustomerDetails;
