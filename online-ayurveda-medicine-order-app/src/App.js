import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./components/Admin/AdminLogin";
import CustomerLogin from "./components/Customer/CustomerLogin";
import Admin from "./components/Admin/Admin";
import MainHeader from "./components/Layout/MainHeader";
import Orders from "./components/Order/Orders";
import OrderProductDetails from "./components/Order/products/OrderProductDetails";
import MedicineListing from "./components/MedicineListing";
import CartProducts from "./components/Cart/CartProducts";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Welcome from './components/Layout/Welcome'
import { authActions } from "./store/auth";

function App() {
  return (
    <Router>
      <div className="App">
        <MainHeader />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/medicines" element={<MedicineListing />} />
          <Route path="/my-orders" element={<Orders />} />
          <Route path="/cart" element={<CartProducts />} />
          <Route path="/my-orders/:id" element={<OrderProductDetails />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/customer/login" element={<CustomerLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
