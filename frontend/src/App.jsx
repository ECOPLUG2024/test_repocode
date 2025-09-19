import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css"
import Login from "./page/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import ProtectedRoute from "./components/ProtectRoutes/ProtectedRoute";
import Profile from "./components/Profile/Profile";
import Products from "./components/Products/Products";
import Order from "./components/Order/Order";
import OrderDetails from "./components/Order/OrderDetails";
import AddProduct from "./components/Products/AddProduct";
import AllUsers from "./components/Users/AllUsers";
import ViewProductDetails from "./components/Products/ViewProductDetails";
import CartItem from "./components/Cart/CartItem";
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes with Sidebar */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Sidebar />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/products" element={<Products />} />
            <Route path="/order" element={<Order />} />
            <Route path="/order-details/:id" element={<OrderDetails />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/view-product-details/:id" element={<ViewProductDetails />} />
            <Route path="/users" element={<AllUsers />} />
            <Route path="/cart-item" element={<CartItem />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
