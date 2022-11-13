import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { save } from "../store/cred";
import Button from "react-bootstrap/Button";
import classes from "./Dashboard.module.css";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUserLoggedInfo = localStorage.getItem("isLoggedIn");
    if (storedUserLoggedInfo === "1") {
      dispatch(authActions.login());
      const storedUserId = localStorage.getItem("loggedId");
      dispatch(save(storedUserId));
      navigate("/welcome");
    }
  }, []);

  const handleAdminClick = () => {
    navigate("/admin/login");
  };

  const handleCustomerClick = () => {
    navigate("/customer/login");
  };

  return (
    <div className={classes["container"]}>
      <Button
        className={classes["button"]}
        variant="success"
        onClick={handleAdminClick}
      >
        Login as Admin
      </Button>
      <Button
        className={classes["button"]}
        variant="primary"
        onClick={handleCustomerClick}
      >
        Login as Customer
      </Button>
    </div>
  );
}

export default Dashboard;
