import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./Auth/Welcome";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Verification from "./Auth/Verification";
import Notification from "./Auth/Notification";
import Forget from "./Auth/Forget";

import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Cart from "./Pages/Cart";
import NotFound from "./component/Notfound";
import Order from "./Pages/Order";

import AuthLayout from "./Layouts/AuthLayout";
import MainLayout from "./Layouts/MainLayout";
import MobileLayout from "./Layouts/MobileLayout";
import OrderHistory from "./Pages/OrderHistory";
// import AdminPanel from "../Dashboard/src/pages/Dashboard";

export default function App() {
  // Cart state to store added items
  const [cart, setCart] = useState([]);

  // Function to add an item to the cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.title === item.title
      );
      if (existingItemIndex === -1) {
        return [...prevCart, item];
      } else {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += item.quantity;
        return updatedCart;
      }
    });
  };

  // Function to delete an item from the cart
  const deleteFromCart = (title) => {
    setCart((prevCart) => prevCart.filter((item) => item.title !== title));
  };

  // Function to update the quantity of an item in the cart
  const updateQuantity = (title, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.title === title ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Pages (No Navbar/Footer) */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Verification" element={<Verification />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/Forget" element={<Forget />} />

        </Route>

        {/* Main Pages (With Navbar/Footer) */}
        <Route element={<MainLayout />}>
        <Route path="/Home" element={<Home />} /> 
        </Route>

        {/* Main Pages (With Navbar) */}
        <Route element={<MobileLayout />}>
          <Route path="/Home" element={<Home />} />         
          <Route path="/orders" element={<Order />} />
          <Route path="/orderhistory" element={<OrderHistory />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart 
                  cart={cart}
                  deleteFromCart={deleteFromCart}
                  updateQuantity={updateQuantity}/>}/>

                  {/* dashboard */}
          {/* <Route path="/dashboard" element={<AdminPanel />} /> */}
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
