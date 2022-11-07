import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./components/Admin/AdminLogin";
import CustomerLogin from "./components/Customer/CustomerLogin";
import Admin from "./components/Admin/Admin";
import MainHeader from "./components/Layout/MainHeader";

function App() {
  return (
    <Router>
      <div className="App">
        <MainHeader />
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/customer/login" element={<CustomerLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
