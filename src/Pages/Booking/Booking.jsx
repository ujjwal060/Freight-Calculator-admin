



// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Box,
//   Chip,
//   Stack,
//   Button,
//   CircularProgress,
//   Tooltip,
//   IconButton
// } from "@mui/material";
// // import { CheckCircle, LocalShipping, Cancel } from "@mui/icons-material";
// import CheckCircle from "@mui/icons-material/CheckCircle";
// import LocalShipping from "@mui/icons-material/LocalShipping";
// import Cancel from "@mui/icons-material/Cancel";

// import axios from "axios";

// const Booking = () => {
//   const [bookings, setBookings] = useState([]);
//   const [filter, setFilter] = useState("All");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [counts, setCounts] = useState({ pending: 0, confirmed: 0, delivered: 0 });

//   const statusOptions = ["All", "Pending", "Confirmed", "Delivered", "Cancelled"];

 
// const fetchCounts = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     const response = await axios.get(
//       "http://15.134.44.62:8888/api/admin/booking/counts",
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     if (response.data?.data) {
//       setCounts(response.data.data); // Keep API keys as is
//     }
//   } catch (err) {
//     console.error("Counts API Error:", err);
//   }
// };

//   // Fetch bookings
//   const fetchBookings = async (status) => {
//     setLoading(true);
//     setError("");

//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         "http://15.134.44.62:8888/api/admin/booking/list",
//         {
//           limit: 10,
//           offset: 0,
//           status: status === "All" ? "" : status,
//           sortField: "",
//           sortBy: -1,
//           filters: {}
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setBookings(response.data?.data?.bookings || []);
//     } catch (err) {
//       console.error("API Error:", err);
//       setError("Failed to fetch bookings.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle status update
//   const handleStatusUpdate = async (bookingId, newStatus) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `http://15.134.44.62:8888/api/admin/booking/status/${bookingId}`,
//         { status: newStatus },
//         { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
//       );

//       fetchBookings(filter);
//       fetchCounts(); // Refresh counts also
//     } catch (err) {
//       console.error("Status Update Error:", err.response?.data || err);
//       alert("Failed to update status");
//     }
//   };

//   useEffect(() => {
//     fetchBookings(filter);
//     fetchCounts();
//   }, [filter]);

//   const handleDeleteChip = () => {
//     setFilter("All");
//   };

//   // Icon rendering logic based on filter
//   const getActionIcons = (b) => {
//     const actions = [];

//     if (filter === "All") {
//       actions.push(
//         <Tooltip title="Confirm" key="confirm">
//           <IconButton onClick={() => handleStatusUpdate(b._id, "Confirmed")} color="success">
//             <CheckCircle />
//           </IconButton>
//         </Tooltip>,
//         <Tooltip title="Deliver" key="deliver">
//           <IconButton onClick={() => handleStatusUpdate(b._id, "Delivered")} color="info">
//             <LocalShipping />
//           </IconButton>
//         </Tooltip>,
//         <Tooltip title="Cancel" key="cancel">
//           <IconButton onClick={() => handleStatusUpdate(b._id, "Cancelled")} color="error">
//             <Cancel />
//           </IconButton>
//         </Tooltip>
//       );
//     } else if (filter === "Pending") {
//       actions.push(
//         <Tooltip title="Confirm" key="confirm">
//           <IconButton onClick={() => handleStatusUpdate(b._id, "Confirmed")} color="success">
//             <CheckCircle />
//           </IconButton>
//         </Tooltip>,
//         <Tooltip title="Cancel" key="cancel">
//           <IconButton onClick={() => handleStatusUpdate(b._id, "Cancelled")} color="error">
//             <Cancel />
//           </IconButton>
//         </Tooltip>
//       );
//     } else if (filter === "Confirmed") {
//       actions.push(
//         <Tooltip title="Deliver" key="deliver">
//           <IconButton onClick={() => handleStatusUpdate(b._id, "Delivered")} color="info">
//             <LocalShipping />
//           </IconButton>
//         </Tooltip>
//       );
//     } else if (filter === "Delivered") {
//       actions.push(
//         <Tooltip title="Delivered" key="delivered">
//           <IconButton disabled color="info">
//             <LocalShipping />
//           </IconButton>
//         </Tooltip>
//       );
//     } else if (filter === "Cancelled") {
//       actions.push(
//         <Tooltip title="Cancelled" key="cancelled">
//           <IconButton disabled color="error">
//             <Cancel />
//           </IconButton>
//         </Tooltip>
//       );
//     }

//     return actions;
//   };

//   return (
//     <Box sx={{ padding: "20px" }}>
//       {/* <Typography variant="h4" gutterBottom>Booking Details</Typography> */}
//       <Typography variant="subtitle1" gutterBottom>List of all customer bookings</Typography>

   

//       {/* Filter Chip */}
//       {filter !== "All" && (
//         <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
//           <Chip label={`Status: ${filter}`} onDelete={handleDeleteChip} color="primary" variant="outlined" />
//         </Stack>
//       )}

// {/* Status Filter Buttons with Counts */}
// <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
//   {statusOptions.map((status) => {
//     const count = counts?.[status] ?? 0; // Fix: get count from API keys directly
//     return (
//       <Button
//         key={status}
//         variant={filter === status ? "contained" : "outlined"}
//         color={
//           status === "Cancelled" ? "error" :
//           status === "Pending" ? "warning" :
//           status === "Confirmed" ? "success" :
//           status === "Delivered" ? "info" : "primary"
//         }
//         onClick={() => setFilter(status)}
//         size="small"
//       >
//         {`${status} (${count})`}
//       </Button>
//     );
//   })}
// </Stack>

//       {/* Booking Table */}
//       <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: "12px", boxShadow: "0px 2px 8px rgba(0,0,0,0.1)" }}>
//         {loading ? (
//           <Box sx={{ textAlign: "center", p: 2 }}>
//             <CircularProgress />
//           </Box>
//         ) : (
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ background: "var(--primary-color)" }}>
//                   <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Booking ID</TableCell>
//                   <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Customer Name</TableCell>
//                   <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Email</TableCell>
//                   <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Mobile</TableCell>
//                   <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>ETA</TableCell>
//                   <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Price</TableCell>
//                   <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Container Type</TableCell>
//                   <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Total Containers</TableCell>
//                   <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Departure → Arrival</TableCell>
//                   <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Status</TableCell>
//                   <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {bookings.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={11} align="center">No Data Available</TableCell>
//                   </TableRow>
//                 ) : (
//                   bookings.map((b) => (
//                     <TableRow key={b._id} sx={{ "&:hover": { background: "rgba(255,107,53,0.05)" } }}>
//                       <TableCell>{b.bookingId}</TableCell>
//                       <TableCell>{b.user?.name || "N/A"}</TableCell>
//                       <TableCell>{b.user?.email || "N/A"}</TableCell>
//                       <TableCell>{b.user?.mobileNumber || "N/A"}</TableCell>
//                       <TableCell>{new Date(b.eta).toLocaleDateString()}</TableCell>
//                       <TableCell>{b.price}</TableCell>
//                       <TableCell>{b.containerType}</TableCell>
//                       <TableCell>{b.totalContainers}</TableCell>
//                       <TableCell>{b.freightRate?.departurePort} → {b.freightRate?.arrivalPort}</TableCell>
//                       <TableCell
//                         style={{
//                           color:
//                             b.status === "Confirmed" ? "green" :
//                             b.status === "Pending" ? "orange" :
//                             b.status === "Cancelled" ? "red" :
//                             b.status === "Delivered" ? "blue" : "gray",
//                           fontWeight: "bold",
//                         }}
//                       >
//                         {b.status}
//                       </TableCell>
//                       <TableCell>
//                         <Stack direction="row" spacing={1}>{getActionIcons(b)}</Stack>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </Paper>
//     </Box>
//   );
// };

// export default Booking;



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
  CircularProgress,
  Tooltip,
  IconButton,
  Tabs,
  Tab
} from "@mui/material";
import CheckCircle from "@mui/icons-material/CheckCircle";
import LocalShipping from "@mui/icons-material/LocalShipping";
import Cancel from "@mui/icons-material/Cancel";
import axios from "axios";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [counts, setCounts] = useState({ pending: 0, confirmed: 0, delivered: 0 });
  const [tabValue, setTabValue] = useState(0);

  const statusOptions = ["All", "Pending", "Confirmed", "Delivered", "Cancelled"];

  const fetchCounts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://15.134.44.62:8888/api/admin/booking/counts",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data?.data) {
        setCounts(response.data.data);
      }
    } catch (err) {
      console.error("Counts API Error:", err);
    }
  };

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
          status: status === "All" ? "" : status,
          sortField: "",
          sortBy: -1,
          filters: {}
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setBookings(response.data?.data?.bookings || []);
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to fetch bookings.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://15.134.44.62:8888/api/admin/booking/status/${bookingId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );

      fetchBookings(filter);
      fetchCounts();
    } catch (err) {
      console.error("Status Update Error:", err.response?.data || err);
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    fetchBookings(filter);
    fetchCounts();
  }, [filter]);

  const handleDeleteChip = () => {
    setFilter("All");
    setTabValue(0);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setFilter(statusOptions[newValue]);
  };

  const getActionIcons = (b) => {
    const actions = [];

    if (filter === "All") {
      actions.push(
        <Tooltip title="Confirm" key="confirm">
          <IconButton onClick={() => handleStatusUpdate(b._id, "Confirmed")} color="success">
            <CheckCircle />
          </IconButton>
        </Tooltip>,
        <Tooltip title="Deliver" key="deliver">
          <IconButton onClick={() => handleStatusUpdate(b._id, "Delivered")} color="info">
            <LocalShipping />
          </IconButton>
        </Tooltip>,
        <Tooltip title="Cancel" key="cancel">
          <IconButton onClick={() => handleStatusUpdate(b._id, "Cancelled")} color="error">
            <Cancel />
          </IconButton>
        </Tooltip>
      );
    } else if (filter === "Pending") {
      actions.push(
        <Tooltip title="Confirm" key="confirm">
          <IconButton onClick={() => handleStatusUpdate(b._id, "Confirmed")} color="success">
            <CheckCircle />
          </IconButton>
        </Tooltip>,
        <Tooltip title="Cancel" key="cancel">
          <IconButton onClick={() => handleStatusUpdate(b._id, "Cancelled")} color="error">
            <Cancel />
          </IconButton>
        </Tooltip>
      );
    } else if (filter === "Confirmed") {
      actions.push(
        <Tooltip title="Deliver" key="deliver">
          <IconButton onClick={() => handleStatusUpdate(b._id, "Delivered")} color="info">
            <LocalShipping />
          </IconButton>
        </Tooltip>
      );
    } else if (filter === "Delivered") {
      actions.push(
        <Tooltip title="Delivered" key="delivered">
          <IconButton disabled color="info">
            <LocalShipping />
          </IconButton>
        </Tooltip>
      );
    } else if (filter === "Cancelled") {
      actions.push(
        <Tooltip title="Cancelled" key="cancelled">
          <IconButton disabled color="error">
            <Cancel />
          </IconButton>
        </Tooltip>
      );
    }

    return actions;
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="subtitle1" gutterBottom>List of all customer bookings</Typography>

      {/* {filter !== "All" && (
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip label={`Status: ${filter}`} onDelete={handleDeleteChip} color="primary" variant="outlined" />
        </Stack>
      )} */}

      {/* Status Tabs */}
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 2 }}
      >
        {statusOptions.map((status, index) => {
          const count = counts?.[status] ?? 0;
          return (
            <Tab
              key={status}
              label={`${status} (${count})`}
              sx={{
                textTransform: "none",
                fontWeight: filter === status ? "bold" : "normal"
              }}
            />
          );
        })}
      </Tabs>

      {/* Booking Table */}
      <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: "12px", boxShadow: "0px 2px 8px rgba(0,0,0,0.1)" }}>
        {loading ? (
          <Box sx={{ textAlign: "center", p: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ background: "var(--primary-color)" }}>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Booking ID</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Customer Name</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Email</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Mobile</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>ETA</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Price</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Container Type</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Total Containers</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Departure → Arrival</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={11} align="center">No Data Available</TableCell>
                  </TableRow>
                ) : (
                  bookings.map((b) => (
                    <TableRow key={b._id} sx={{ "&:hover": { background: "rgba(255,107,53,0.05)" } }}>
                      <TableCell>{b.bookingId}</TableCell>
                      <TableCell>{b.user?.name || "N/A"}</TableCell>
                      <TableCell>{b.user?.email || "N/A"}</TableCell>
                      <TableCell>{b.user?.mobileNumber || "N/A"}</TableCell>
                      <TableCell>{new Date(b.eta).toLocaleDateString()}</TableCell>
                      <TableCell>{b.price}</TableCell>
                      <TableCell>{b.containerType}</TableCell>
                      <TableCell>{b.totalContainers}</TableCell>
                      <TableCell>{b.freightRate?.departurePort} → {b.freightRate?.arrivalPort}</TableCell>
                      <TableCell
                        style={{
                          color:
                            b.status === "Confirmed" ? "green" :
                              b.status === "Pending" ? "orange" :
                                b.status === "Cancelled" ? "red" :
                                  b.status === "Delivered" ? "blue" : "gray",
                          fontWeight: "bold",
                        }}
                      >
                        {b.status}
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>{getActionIcons(b)}</Stack>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
};

export default Booking;
