


import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";

const Booking = () => {
  const bookings = [
    { id: 101, customer: "John Doe", date: "2025-09-15", status: "Confirmed" },
    { id: 102, customer: "Jane Smith", date: "2025-09-16", status: "Pending" },
    { id: 103, customer: "Michael Lee", date: "2025-09-17", status: "Cancelled" },
    { id: 104, customer: "Alex Brown", date: "2025-09-18", status: "Deleted" },
  ];

  const [filter, setFilter] = useState("All");

  // Filter bookings based on status
  const filteredBookings =
    filter === "All"
      ? bookings
      : bookings.filter((b) => b.status.toLowerCase() === filter.toLowerCase());

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Booking Details
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        List of all customer bookings
      </Typography>

      {/* Filter Section */}
      <Box sx={{ marginBottom: "20px", width: "200px" }}>
        <FormControl fullWidth>
          <InputLabel>Status Filter</InputLabel>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            label="Status Filter"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Confirmed">Confirmed</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
            <MenuItem value="Deleted">Deleted</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Table Section */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBookings.map((b) => (
              <TableRow key={b.id}>
                <TableCell>{b.id}</TableCell>
                <TableCell>{b.customer}</TableCell>
                <TableCell>{b.date}</TableCell>
                <TableCell>
                  <span
                    style={{
                      color:
                        b.status === "Confirmed"
                          ? "green"
                          : b.status === "Pending"
                          ? "orange"
                          : b.status === "Cancelled"
                          ? "red"
                          : "gray",
                      fontWeight: "bold",
                    }}
                  >
                    {b.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Booking;
