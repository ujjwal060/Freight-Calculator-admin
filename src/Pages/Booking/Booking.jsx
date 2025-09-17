
import React from "react";
import "../../index.css"; // Ensure global CSS is applied

const Booking = () => {
  const bookings = [
    { id: 101, customer: "John Doe", date: "2025-09-15", status: "Confirmed" },
    { id: 102, customer: "Jane Smith", date: "2025-09-16", status: "Pending" },
    { id: 103, customer: "Michael Lee", date: "2025-09-17", status: "Cancelled" },
  ];

  return (
    <div className="booking-page">
      <h1 className="page-title">Booking Details</h1>
      <p className="page-subtitle">List of all customer bookings</p>

      <div className="content-card">
        <h2 className="card-title">Bookings Table</h2>
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.customer}</td>
                <td>{b.date}</td>
                <td className={`status ${b.status.toLowerCase()}`}>{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Booking;
