import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { authActions } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import CustomerUpdateUtil from "./CustomerUpdateUtil";
import backendAPI from "../../apis/backendAPI";

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
    if (storedUserLoggedInfo === "0") {
      navigate("/customer/login");
    }
    setUserId(localStorage.getItem("loggedId"));
    console.log(userId);
    fetchCustomerDetails();
  }, []);

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
    <div className="container">
      <div key={CustomerDetails.customerId}>
        <h1>Customer Details</h1>
        <p>ID : {CustomerDetails.customerId}</p>
        <p>Name : {CustomerDetails.customerName}</p>
        <p>Password : {CustomerDetails.customerPassword}</p>
      </div>

      <Button variant="danger" onClick={handleDelete}>
        Delete Account
      </Button>
      <div className="buttons">
        <Button
          variant="warning"
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
          Update Password
        </Button>
      </div>
      <Collapse in={open}>
        <div id="example-collapse-text">
          <CustomerUpdateUtil />
        </div>
      </Collapse>
      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default CustomerDetails;
