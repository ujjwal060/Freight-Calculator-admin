

import React from "react";
import "../../index.css"; // Global CSS

const PaymentDetails = () => {
  const payments = [
    { id: 1, customer: "Jane Smith", amount: "$500", date: "2025-09-10", status: "Paid" },
    { id: 2, customer: "John Doe", amount: "$750", date: "2025-09-12", status: "Pending" },
    { id: 3, customer: "Alice Johnson", amount: "$300", date: "2025-09-14", status: "Failed" },
  ];

  return (
    <div className="payment-page">
      <h1 className="page-title">Payment Details</h1>
      <p className="page-subtitle">Overview of all customer payments</p>

      <div className="content-card">
        <h2 className="card-title">Payments Table</h2>
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.customer}</td>
                <td>{p.amount}</td>
                <td>{p.date}</td>
                <td className={`status ${p.status.toLowerCase()}`}>{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentDetails;
