import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import AdminLogin from "./components/Admin/AdminLogin";
import CustomerLogin from "./components/Customer/CustomerLogin";
import Admin from "./components/Admin/Admin";
import MainHeader from "./components/Layout/MainHeader";
import Orders from "./components/Order/Orders";
import CustomerDetails from "./components/Customer/CustomerDetails";
import Dashboard from "./components/Dashboard";
import WelcomePage from "./components/Layout/WelcomePage";

function App() {
  return (
    <Router>
      <div className="App">
        <MainHeader />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/my-orders" element={<Orders />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/customer/login" element={<CustomerLogin />} />
          <Route path="/customer" element={<CustomerDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
