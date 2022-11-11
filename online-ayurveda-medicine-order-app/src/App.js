import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import AdminLogin from "./components/Admin/AdminLogin";
import CustomerLogin from "./components/Customer/CustomerLogin";
import Admin from "./components/Admin/Admin";
import MainHeader from "./components/Layout/MainHeader";
import Orders from "./components/Order/customer/Orders";
import OrderProductDetails from "./components/Order/products/OrderProductDetails";
import MedicineListing from "./components/Medicine/MedicineListing";
import CartProducts from "./components/Cart/CartProducts";
import { authActions } from "./store/auth";
import CustomerDetails from "./components/Customer/CustomerDetails";
import Dashboard from "./components/Dashboard";
import WelcomePage from "./components/Layout/WelcomePage";
import AdminOrders from "./components/Order/admin/AdminOrders";
import MedicineUpdate from "./components/Medicine/MedicineUpdate";
import MedicineAdd from "./components/Medicine/MedicineAdd";
import MedicineUpdateForm from "./components/Medicine/MedicineUpdateForm";
import Footer from "./components/Layout/Footer";
import UserProfiles from "./components/Customer/UserProfiles";

function App() {
  return (
    <Router>
      <div className="App">
        <MainHeader />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/customer" element={<CustomerDetails />} />
          <Route path="/customer/login" element={<CustomerLogin />} />
          <Route path="/medicines" element={<MedicineListing />} />
          <Route path="/cart" element={<CartProducts />} />
          <Route path="/my-orders" element={<Orders />} />
          <Route path="/my-orders/:id" element={<OrderProductDetails />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/updateMedicine" element={<MedicineUpdate />} />
          <Route path="/addMedicines" element={<MedicineAdd />} />
          <Route
            path="/medicine-updateform/:medicineId"
            element={<MedicineUpdateForm />}
          />
          <Route path="/managecustomer" element={<UserProfiles />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
