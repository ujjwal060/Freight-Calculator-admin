
import React from "react";
import { FaUser, FaBook, FaMoneyBill, FaCalculator } from "react-icons/fa";
// import "../../index.css";

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      {/* <h1 className="dashboard-title">Admin Dashboard</h1> */}
      {/* <p className="dashboard-subtitle">Welcome to your Calculator Admin Panel!</p> */}

      {/* Stat Cards */}
      <div className="stats-container">
        <div className="stat-card">
          <FaUser className="stat-icon" />
          <h3>120</h3>
          <p>Total Users</p>
        </div>
        <div className="stat-card">
          <FaBook className="stat-icon" />
          <h3>85</h3>
          <p>Total Bookings</p>
        </div>
        <div className="stat-card">
          <FaMoneyBill className="stat-icon" />
          <h3>₹50,000</h3>
          <p>Total Payments</p>
        </div>
        <div className="stat-card">
          <FaCalculator className="stat-icon" />
          <h3>35</h3>
          <p>Calculations Done</p>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="recent-activity">
        <h2>Recent Activities</h2>
        <table className="activity-table">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Activity</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>New Booking Created</td>
              <td>2025-09-15</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jane Smith</td>
              <td>Payment Received</td>
              <td>2025-09-14</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Mike Johnson</td>
              <td>Account Created</td>
              <td>2025-09-14</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
