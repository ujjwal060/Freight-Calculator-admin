

import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaBook, FaMoneyBill, FaBars, FaTruck } from "react-icons/fa";
import "../../index.css";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-title">{collapsed ? "AP" : "Admin Panel"}</div>
        <ul className="sidebar-menu">
          <li onClick={() => navigate("/dashboard")}>
            <FaHome className="sidebar-icon" />
            {!collapsed && <span>Dashboard</span>}
          </li>
          <li onClick={() => navigate("/users")}>
            <FaUser className="sidebar-icon" />
            {!collapsed && <span>Users</span>}
          </li>
          <li onClick={() => navigate("/bookings")}>
            <FaBook className="sidebar-icon" />
            {!collapsed && <span>Bookings</span>}
          </li>
          <li onClick={() => navigate("/payments")}>
            <FaMoneyBill className="sidebar-icon" />
            {!collapsed && <span>Payments</span>}
          </li>

          <li onClick={() => navigate("/freight-rate")}>
            <FaTruck className="sidebar-icon" />
            {!collapsed && <span>Freight Rate</span>}
          </li>

        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content " style={collapsed ? {marginLeft: "80px"} : {  }}>
        <div className="header">
          <button onClick={() => setCollapsed(!collapsed)} className="btn-icon">
            <FaBars />
          </button>
          <button onClick={() => setShowLogoutPopup(true)} className="btn-small">
            Logout
          </button>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h3>Are you sure?</h3>
            <p>Do you really want to logout?</p>
            <div className="popup-buttons">
              <button className="btn-small" onClick={handleLogout}>Yes, Logout</button>
              <button className="btn-small cancel" onClick={() => setShowLogoutPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;

