import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import { NavLink } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import UpdateUtil from "./UpdateUtil";
import "../../CSS/admin.css";

function Admin() {
  const auth = useSelector((state) => state.auth.isAuth);
  const id = useSelector((state) => state.userId);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUserLoggedInfo = localStorage.getItem("isLoggedIn");
    if (storedUserLoggedInfo === "0") {
      navigate("/admin/login");
    }
  }, []);

  const handleLogout = async () => {
    dispatch(authActions.logout());
    navigate("/admin/login");
  };

  const handleUpdatePassword = () => {};

  console.log(auth);
  console.log(id);
  return (
    <div className="container-3">
      <h1>Management Services</h1>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Medicine Management</Card.Title>
          <Card.Text>
            Perform management on medicine store. For example, adding new
            medicines, deleting medicine out of stock or updating details for
            any medicine.
          </Card.Text>
          <Button variant="primary" onClick={() => navigate("/managemeds")}>
            Click
          </Button>
        </Card.Body>
      </Card>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Order Management</Card.Title>
          <Card.Text>
            Perform management on existing orders. For example, updating order
            details.
          </Card.Text>
          <Button variant="primary" onClick={() => navigate("/manageorders")}>
            Click
          </Button>
        </Card.Body>
      </Card>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Customer Management</Card.Title>
          <Card.Text>
            Perform management on existing customers. For example, deleting
            fraudulent customer accounts.
          </Card.Text>
          <Button variant="primary" onClick={() => navigate("/managecustomer")}>
            Click
          </Button>
        </Card.Body>
      </Card>
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
          <UpdateUtil />
        </div>
      </Collapse>
      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default Admin;
