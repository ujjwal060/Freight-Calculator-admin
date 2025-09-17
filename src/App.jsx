


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Auth Pages
import Login from "./components/Auth/Login";
// import ForgotPassword from "./components/Auth/ForgotPassword";
import VerifyOtp from "./components/Auth/VerifyOtp";
import ResetPassword from "./components/Auth/ResetPassword";
import ForgotPassword from './components/Auth/ForgetPassword'
// Protected Pages
import Dashboard from "./Pages/Dashboard/Dashboard";
import Users from "./Pages/Users/UserDetails";
import Booking from "./Pages/Booking/Booking";
import PaymentDetails from "./Pages/PaymentDetails/PaymentDetails";
import Layout from "./components/Layout/Layout";
import FreightRate from "./Pages/FreightRate/FreightRate";

import "./index.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Routes */}
        {isLoggedIn ? (
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/bookings" element={<Booking />} />
            <Route path="/payments" element={<PaymentDetails />} />
            <Route path="/freight-rate" element={<FreightRate />} />

          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
