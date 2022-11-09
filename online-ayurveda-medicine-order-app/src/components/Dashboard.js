import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { save } from "../store/cred";

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
    <div>
      <button onClick={handleAdminClick}>Login as Admin</button>
      <button onClick={handleCustomerClick}>Login as Customer</button>
    </div>
  );
}

export default Dashboard;
