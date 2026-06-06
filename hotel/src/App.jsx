import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import OrdersPage from "./pages/OrdersPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { ProtectedRoute } from "./components/ProtectedRoute";

import "./App.css";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const location = useLocation();

  const fullText = "Welcome to FASTBITE";

  // 🔥 Typing Effect
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(typing);
    }, 60);
  }, []);

  // 🔥 First Load Loader
  useEffect(() => {
    const timer = setTimeout(() => {
      const loader = document.querySelector(".loader");
      if (loader) loader.classList.add("fade-out");

      const timer2 = setTimeout(() => {
        setLoading(false);
      }, 700);
      return () => clearTimeout(timer2);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // 🔥 Route Change Loader (real website feel)
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="loader bg-[#121212]">
        <div className="loader-content">
          <h1 className="logo-text text-[#FF6B00] font-extrabold tracking-widest">{text || "FASTBITE"}</h1>
          <div className="line bg-[#FFB800] h-[3px]"></div>
          <p className="tagline text-white">Hot, Fresh & Delivered Fast</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      
      <Route
        path="/checkout"
        element={
          <ProtectedRoute adminOnly={false}>
            <Checkout />
          </ProtectedRoute>
        }
      />

      {/* Orders page */}
      <Route
        path="/orders"
        element={
          <ProtectedRoute adminOnly={false}>
            <OrdersPage />
          </ProtectedRoute>
        }
      />

      {/* Admin page */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly={true}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}