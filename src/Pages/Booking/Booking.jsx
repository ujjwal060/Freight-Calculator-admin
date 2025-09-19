




import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
  Stack,
  Button,
  CircularProgress
} from "@mui/material";
import axios from "axios";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const statusOptions = ["All", "Pending", "Confirmed", "Delivered", "Cancelled"];

  // Fetch bookings from API
  const fetchBookings = async (status) => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://15.134.44.62:8888/api/admin/booking/list",
        {
          limit: 10,
          offset: 0,
          status: status,
          sortField: "",
          sortBy: -1,
          filters: {}
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data && response.data.data && response.data.data.bookings) {
        setBookings(response.data.data.bookings);
      } else {
        setBookings([]);
      }
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to fetch bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings(filter);
  }, [filter]);

  const handleDeleteChip = () => {
    setFilter("All");
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Booking Details
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        List of all customer bookings
      </Typography>

      {/* Filter Chip */}
      {filter !== "All" && (
        <Stack direction="row" spacing={1} sx={{ marginBottom: 2 }}>
          <Chip
            label={`Status: ${filter}`}
            onDelete={handleDeleteChip}
            color="primary"
            variant="outlined"
          />
        </Stack>
      )}

      {/* Status Filter Buttons */}
      <Stack direction="row" spacing={1} sx={{ marginBottom: 2 }}>
        {statusOptions.map((status) => (
          <Button
            key={status}
            variant={filter === status ? "contained" : "outlined"}
            color={
              status === "Cancelled"
                ? "error"
                : status === "Pending"
                ? "warning"
                : status === "Confirmed"
                ? "success"
                : status === "Delivered"
                ? "info"
                : "primary"
            }
            onClick={() => setFilter(status)}
            size="small"
          >
            {status}
          </Button>
        ))}
      </Stack>

      {/* Booking Table */}
      <TableContainer component={Paper}>
        {loading ? (
          <Box sx={{ textAlign: "center", padding: 2 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" align="center" sx={{ padding: 2 }}>
            {error}
          </Typography>
        ) : bookings.length === 0 ? (
          <Typography align="center" sx={{ padding: 2 }}>
            No Data Available
          </Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell>Booking ID</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>ETA</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Container Type</TableCell>
                <TableCell>Total Containers</TableCell>
                <TableCell>Departure → Arrival</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((b) => (
                <TableRow key={b._id}>
                  <TableCell>{b.bookingId}</TableCell>
                  <TableCell>{b.user?.name || "N/A"}</TableCell>
                  <TableCell>{b.user?.email || "N/A"}</TableCell>
                  <TableCell>{b.user?.mobileNumber || "N/A"}</TableCell>
                  <TableCell>{new Date(b.eta).toLocaleDateString()}</TableCell>
                  <TableCell>{b.price}</TableCell>
                  <TableCell>{b.containerType}</TableCell>
                  <TableCell>{b.totalContainers}</TableCell>
                  <TableCell>
                    {b.freightRate?.departurePort} → {b.freightRate?.arrivalPort}
                  </TableCell>
                  <TableCell
                    style={{
                      color:
                        b.status === "Confirmed"
                          ? "green"
                          : b.status === "Pending"
                          ? "orange"
                          : b.status === "Cancelled"
                          ? "red"
                          : b.status === "Delivered"
                          ? "blue"
                          : "gray",
                      fontWeight: "bold",
                    }}
                  >
                    {b.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Box>
  );
};

export default Booking;
