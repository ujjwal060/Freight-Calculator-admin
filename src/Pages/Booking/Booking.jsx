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
//   IconButton,
//   Tabs,
//   Tab,
//   TablePagination,
//   TableSortLabel,
// } from "@mui/material";
// import CheckCircle from "@mui/icons-material/CheckCircle";
// import LocalShipping from "@mui/icons-material/LocalShipping";
// import Cancel from "@mui/icons-material/Cancel";
// import axios from "../../api/axios";
// import DatePicker from "react-multi-date-picker";
// import DatePanel from "react-multi-date-picker/plugins/date_panel";
// const Booking = () => {
//   const [bookings, setBookings] = useState([]);
//   const [filter, setFilter] = useState("All");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [counts, setCounts] = useState({
//     pending: 0,
//     confirmed: 0,
//     delivered: 0,
//   });
//   const [tabValue, setTabValue] = useState(0);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [totalCount, setTotalCount] = useState(0);
//   const [sortField, setSortField] = useState("");
//   const [sortBy, setSortBy] = useState(-1); // -1: desc, 1: asc
//   const [dateRange, setDateRange] = useState([null, null]); // [startDate, endDate]
//   const [order, setOrder] = useState("asc"); // 'asc' or 'desc'
//   const [orderBy, setOrderBy] = useState("bookingId"); // default sort field

//   const statusOptions = [
//     "All",
//     "Pending",
//     "Confirmed",
//     "Delivered",
//     "Cancelled",
//   ];

//   const fetchCounts = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         "http://15.134.44.62:8888/api/admin/booking/counts",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (response.data?.data) {
//         setCounts(response.data.data);
//       }
//     } catch (err) {
//       console.error("Counts API Error:", err);
//     }
//   };

//   const fetchBookings = async (status) => {
//     setLoading(true);
//     setError("");
//     const payload = {
//       limit: rowsPerPage,
//       offset: page * rowsPerPage,
//       status: filter === "All" ? "" : filter,
//       sortField: orderBy,
//       sortBy: order === "asc" ? 1 : -1, // 1 = ascending, -1 = descending
//       filters: {},
//     };

//     // Add date range filter if selected
//     if (dateRange[0] && dateRange[1]) {
//       payload.filters.eta = {
//         $gte: dateRange[0],
//         $lte: dateRange[1],
//       };
//     }
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         "http://15.134.44.62:8888/api/admin/booking/list",
//         payload,

//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setBookings(response.data?.data?.bookings || []);
//       setTotalCount(response.data?.data?.totalCount || 0);
//     } catch (err) {
//       console.error("API Error:", err);
//       setError("Failed to fetch bookings.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusUpdate = async (bookingId, newStatus) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `http://15.134.44.62:8888/api/admin/booking/status/${bookingId}`,
//         { status: newStatus },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       fetchBookings(filter);
//       fetchCounts();
//     } catch (err) {
//       console.error("Status Update Error:", err.response?.data || err);
//       alert("Failed to update status");
//     }
//   };

//   const handleRequestSort = (property) => {
//     const isAsc = orderBy === property && order === "asc";
//     setOrder(isAsc ? "desc" : "asc");
//     setOrderBy(property);
//   };

//   useEffect(() => {
//     fetchBookings(filter);
//     fetchCounts();
//   }, [filter, page, rowsPerPage, order, orderBy, dateRange]);

//   const handleDeleteChip = () => {
//     setFilter("All");
//     setTabValue(0);
//   };

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//     setFilter(statusOptions[newValue]);
//   };

//   const getActionIcons = (b) => {
//     const actions = [];

//     switch (b.status) {
//       case "Pending":
//         actions.push(
//           <Tooltip title="Confirm" key="confirm">
//             <IconButton
//               onClick={() => handleStatusUpdate(b._id, "Confirmed")}
//               color="success"
//             >
//               <CheckCircle />
//             </IconButton>
//           </Tooltip>,
//           <Tooltip title="Cancel" key="cancel">
//             <IconButton
//               onClick={() => handleStatusUpdate(b._id, "Cancelled")}
//               color="error"
//             >
//               <Cancel />
//             </IconButton>
//           </Tooltip>
//         );
//         break;

//       case "Confirmed":
//         actions.push(
//           <Tooltip title="Deliver" key="deliver">
//             <IconButton
//               onClick={() => handleStatusUpdate(b._id, "Delivered")}
//               color="info"
//             >
//               <LocalShipping />
//             </IconButton>
//           </Tooltip>
//         );
//         break;

//       case "Delivered":
//         actions.push(
//           <Tooltip title="Delivered" key="delivered">
//             <IconButton disabled color="info">
//               <LocalShipping />
//             </IconButton>
//           </Tooltip>
//         );
//         break;

//       case "Cancelled":
//         actions.push(
//           <Tooltip title="Cancelled" key="cancelled">
//             <IconButton disabled color="error">
//               <Cancel />
//             </IconButton>
//           </Tooltip>
//         );
//         break;

//       default: // For "All" or unknown statuses
//         actions.push(
//           <Tooltip title="Confirm" key="confirm">
//             <IconButton
//               onClick={() => handleStatusUpdate(b._id, "Confirmed")}
//               color="success"
//             >
//               <CheckCircle />
//             </IconButton>
//           </Tooltip>,
//           <Tooltip title="Deliver" key="deliver">
//             <IconButton
//               onClick={() => handleStatusUpdate(b._id, "Delivered")}
//               color="info"
//             >
//               <LocalShipping />
//             </IconButton>
//           </Tooltip>,
//           <Tooltip title="Cancel" key="cancel">
//             <IconButton
//               onClick={() => handleStatusUpdate(b._id, "Cancelled")}
//               color="error"
//             >
//               <Cancel />
//             </IconButton>
//           </Tooltip>
//         );
//         break;
//     }

//     return actions;
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   // Sorting handler
//   const handleSort = (field) => {
//     const isAsc = sortField === field && sortBy === 1;
//     setSortBy(isAsc ? -1 : 1);
//     setSortField(field);
//   };

//   return (
//     <Box sx={{ padding: "20px" }}>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <Tabs
//           value={tabValue}
//           onChange={handleTabChange}
//           variant="scrollable"
//           scrollButtons="auto"
//           sx={{ mb: 2 }}
//         >
//           {statusOptions.map((status, index) => {
//             const count = counts?.[status] ?? 0;
//             return (
//               <Tab
//                 key={status}
//                 label={`${status} (${count})`}
//                 sx={{
//                   textTransform: "none",
//                   fontWeight: filter === status ? "bold" : "normal",
//                 }}
//               />
//             );
//           })}
//         </Tabs>
//         <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
//           <DatePicker
//             value={dateRange}
//             onChange={setDateRange}
//             range
//             numberOfMonths={2} // Show 2 months side by side
//             format="YYYY-MM-DD"
//             containerStyle={{ width: "200px" }}
//             style={{
//               borderRadius: "4px",
//               border: "1px solid #ccc",
//               padding: "5px",
//             }}
//           />
//         </Box>
//       </Box>

//       {/* Booking Table */}
//       <Paper
//         sx={{
//           width: "100%",
//           overflow: "hidden",
//           borderRadius: "12px",
//           boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
//         }}
//       >
//         {loading ? (
//           <Box sx={{ textAlign: "center", p: 2 }}>
//             <CircularProgress />
//           </Box>
//         ) : (
//           <TableContainer
//             sx={{
//               maxHeight: "60vh",
//               minHeight: "60vh",
//               overflow: "auto",
//               width: "100%",
//             }}
//           >
//             <Table stickyHeader aria-label="sticky table">
//               <TableHead>
//                 <TableRow
//                   className="table-custom"
//                   sx={{ background: "#ff6b35" }}
//                 >
//                   <TableCell
//                     sx={{
//                       color: "#fff",
//                       fontWeight: "bold",
//                       backgroundColor: "#ff6b35",
//                     }}
//                   >
//                     <TableSortLabel
//                       active={orderBy === "bookingId"}
//                       direction={orderBy === "bookingId" ? order : "asc"}
//                       onClick={() => handleRequestSort("bookingId")}
//                     >
//                       Booking ID
//                     </TableSortLabel>
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       color: "#fff",
//                       fontWeight: "bold",
//                       backgroundColor: "#ff6b35",
//                     }}
//                   >
//                     Customer Name
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       color: "#fff",
//                       fontWeight: "bold",
//                       backgroundColor: "#ff6b35",
//                     }}
//                   >
//                     Email
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       color: "#fff",
//                       fontWeight: "bold",
//                       backgroundColor: "#ff6b35",
//                     }}
//                   >
//                     Mobile
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       color: "#fff",
//                       fontWeight: "bold",
//                       backgroundColor: "#ff6b35",
//                     }}
//                   >
//                     <TableSortLabel
//                       active={orderBy === "eta"}
//                       direction={orderBy === "eta" ? order : "asc"}
//                       onClick={() => handleRequestSort("eta")}
//                     >
//                       ETA
//                     </TableSortLabel>
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       color: "#fff",
//                       fontWeight: "bold",
//                       backgroundColor: "#ff6b35",
//                     }}
//                   >
//                     <TableSortLabel
//                       active={orderBy === "price"}
//                       direction={orderBy === "price" ? order : "asc"}
//                       onClick={() => handleRequestSort("price")}
//                     >
//                       Price
//                     </TableSortLabel>
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       color: "#fff",
//                       fontWeight: "bold",
//                       backgroundColor: "#ff6b35",
//                     }}
//                   >
//                     Container Type
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       color: "#fff",
//                       fontWeight: "bold",
//                       backgroundColor: "#ff6b35",
//                     }}
//                   >
//                     <TableSortLabel
//                       active={orderBy === "totalContainers"}
//                       direction={orderBy === "totalContainers" ? order : "asc"}
//                       onClick={() => handleRequestSort("totalContainers")}
//                     >
//                       Total Containers
//                     </TableSortLabel>
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       color: "#fff",
//                       fontWeight: "bold",
//                       backgroundColor: "#ff6b35",
//                     }}
//                   >
//                     Departure → Arrival
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       color: "#fff",
//                       fontWeight: "bold",
//                       backgroundColor: "#ff6b35",
//                     }}
//                   >
//                     Status
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       color: "#fff",
//                       fontWeight: "bold",
//                       backgroundColor: "#ff6b35",
//                     }}
//                   >
//                     Actions
//                   </TableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody
//                 sx={{
//                   maxHeight: "inherit",
//                   overflow: "scroll",
//                   overflowX: "hidden",
//                 }}
//               >
//                 {bookings.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={11} align="center">
//                       No Data Available
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   bookings.map((b) => (
//                     <TableRow
//                       key={b._id}
//                       sx={{
//                         "&:hover": { background: "rgba(255,107,53,0.05)" },
//                       }}
//                     >
//                       <TableCell>{b.bookingId}</TableCell>
//                       <TableCell>{b.user?.name || "N/A"}</TableCell>
//                       <TableCell>{b.user?.email || "N/A"}</TableCell>
//                       <TableCell>{b.user?.mobileNumber || "N/A"}</TableCell>
//                       <TableCell>
//                         {new Date(b.eta).toLocaleDateString()}
//                       </TableCell>
//                       <TableCell>{b.price}</TableCell>
//                       <TableCell>{b.containerType}</TableCell>
//                       <TableCell>{b.totalContainers}</TableCell>
//                       <TableCell>
//                         {b.freightRate?.departurePort} →{" "}
//                         {b.freightRate?.arrivalPort}
//                       </TableCell>
//                       <TableCell
//                         style={{
//                           color:
//                             b.status === "Confirmed"
//                               ? "green"
//                               : b.status === "Pending"
//                               ? "orange"
//                               : b.status === "Cancelled"
//                               ? "red"
//                               : b.status === "Delivered"
//                               ? "blue"
//                               : "gray",
//                           fontWeight: "bold",
//                         }}
//                       >
//                         {b.status}
//                       </TableCell>
//                       <TableCell>
//                         <Stack direction="row" spacing={1}>
//                           {getActionIcons(b)}
//                         </Stack>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//         <TablePagination
//           component="div"
//           count={totalCount}
//           page={page}
//           onPageChange={handleChangePage}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//           // rowsPerPageOptions={[5, 10, 20]}
//            rowsPerPageOptions={[ 10, 20,50]}
//           sx={{
//             ".MuiTablePagination-toolbar": {
//               backgroundColor: "var(--primary-bg)",
//             },
//             ".MuiTablePagination-selectIcon": { color: "var(--primary-color)" },
//             ".MuiTablePagination-actions button": {
//               color: "var(--primary-color)",
//             },
//           }}
//         />
//       </Paper>
//     </Box>
//   );
// };

// export default Booking;





// import React, { useState, useEffect } from "react";
// import {
//   Typography,
//   Box,
//   Stack,
//   Button,
//   CircularProgress,
//   Tooltip,
//   IconButton,
//   Tabs,
//   Tab,
// } from "@mui/material";
// import CheckCircle from "@mui/icons-material/CheckCircle";
// import LocalShipping from "@mui/icons-material/LocalShipping";
// import Cancel from "@mui/icons-material/Cancel";
// import axios from "../../api/axios";
// import DatePicker from "react-multi-date-picker";
// import CommonTable from "../../components/CommonTable";

// const Booking = () => {
//   const [bookings, setBookings] = useState([]);
//   const [filter, setFilter] = useState("All");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [counts, setCounts] = useState({
//     pending: 0,
//     confirmed: 0,
//     delivered: 0,
//   });
//   const [tabValue, setTabValue] = useState(0);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [totalCount, setTotalCount] = useState(0);
//   const [sortField, setSortField] = useState("");
//   const [sortBy, setSortBy] = useState(-1);
//   const [dateRange, setDateRange] = useState([null, null]);
//   const [order, setOrder] = useState("asc");
//   const [orderBy, setOrderBy] = useState("bookingId");

//   const statusOptions = [
//     "All",
//     "Pending",
//     "Confirmed",
//     "Delivered",
//     "Cancelled",
//   ];

//   const fetchCounts = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         "http://15.134.44.62:8888/api/admin/booking/counts",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (response.data?.data) {
//         setCounts(response.data.data);
//       }
//     } catch (err) {
//       console.error("Counts API Error:", err);
//     }
//   };

//   const fetchBookings = async () => {
//     setLoading(true);
//     setError("");
//     const payload = {
//       limit: rowsPerPage,
//       offset: page * rowsPerPage,
//       status: filter === "All" ? "" : filter,
//       sortField: orderBy,
//       sortBy: order === "asc" ? 1 : -1,
//       filters: {},
//     };

//     if (dateRange[0] && dateRange[1]) {
//       payload.filters.eta = {
//         $gte: dateRange[0],
//         $lte: dateRange[1],
//       };
//     }
    
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         "http://15.134.44.62:8888/api/admin/booking/list",
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setBookings(response.data?.data?.bookings || []);
//       setTotalCount(response.data?.data?.totalCount || 0);
//     } catch (err) {
//       console.error("API Error:", err);
//       setError("Failed to fetch bookings.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusUpdate = async (bookingId, newStatus) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `http://15.134.44.62:8888/api/admin/booking/status/${bookingId}`,
//         { status: newStatus },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       fetchBookings();
//       fetchCounts();
//     } catch (err) {
//       console.error("Status Update Error:", err.response?.data || err);
//       alert("Failed to update status");
//     }
//   };

//   const handleRequestSort = (property) => {
//     const isAsc = orderBy === property && order === "asc";
//     setOrder(isAsc ? "desc" : "asc");
//     setOrderBy(property);
//   };

//   useEffect(() => {
//     fetchBookings();
//     fetchCounts();
//   }, [filter, page, rowsPerPage, order, orderBy, dateRange]);

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//     setFilter(statusOptions[newValue]);
//   };

//   const getActionIcons = (b) => {
//     const actions = [];

//     switch (b.status) {
//       case "Pending":
//         actions.push(
//           <Tooltip title="Confirm" key="confirm">
//             <IconButton
//               onClick={() => handleStatusUpdate(b._id, "Confirmed")}
//               color="success"
//             >
//               <CheckCircle />
//             </IconButton>
//           </Tooltip>,
//           <Tooltip title="Cancel" key="cancel">
//             <IconButton
//               onClick={() => handleStatusUpdate(b._id, "Cancelled")}
//               color="error"
//             >
//               <Cancel />
//             </IconButton>
//           </Tooltip>
//         );
//         break;

//       case "Confirmed":
//         actions.push(
//           <Tooltip title="Deliver" key="deliver">
//             <IconButton
//               onClick={() => handleStatusUpdate(b._id, "Delivered")}
//               color="info"
//             >
//               <LocalShipping />
//             </IconButton>
//           </Tooltip>
//         );
//         break;

//       case "Delivered":
//         actions.push(
//           <Tooltip title="Delivered" key="delivered">
//             <IconButton disabled color="info">
//               <LocalShipping />
//             </IconButton>
//           </Tooltip>
//         );
//         break;

//       case "Cancelled":
//         actions.push(
//           <Tooltip title="Cancelled" key="cancelled">
//             <IconButton disabled color="error">
//               <Cancel />
//             </IconButton>
//           </Tooltip>
//         );
//         break;

//       default:
//         actions.push(
//           <Tooltip title="Confirm" key="confirm">
//             <IconButton
//               onClick={() => handleStatusUpdate(b._id, "Confirmed")}
//               color="success"
//             >
//               <CheckCircle />
//             </IconButton>
//           </Tooltip>,
//           <Tooltip title="Deliver" key="deliver">
//             <IconButton
//               onClick={() => handleStatusUpdate(b._id, "Delivered")}
//               color="info"
//             >
//               <LocalShipping />
//             </IconButton>
//           </Tooltip>,
//           <Tooltip title="Cancel" key="cancel">
//             <IconButton
//               onClick={() => handleStatusUpdate(b._id, "Cancelled")}
//               color="error"
//             >
//               <Cancel />
//             </IconButton>
//           </Tooltip>
//         );
//         break;
//     }

//     return actions;
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleSort = (field) => {
//     const isAsc = orderBy === field && order === "asc";
//     setOrder(isAsc ? "desc" : "asc");
//     setOrderBy(field);
//   };

//   // Define columns for CommonTable
//   const columns = [
//     {
//       field: "bookingId",
//       headerName: "Booking ID",
//       minWidth: 120,
//       sortable: true,
//     },
//     {
//       field: "customerName",
//       headerName: "Customer Name",
//       minWidth: 150,
//       renderCell: (row) => row.user?.name || "N/A"
//     },
//     {
//       field: "email", 
//       headerName: "Email",
//       minWidth: 200,
//       renderCell: (row) => row.user?.email || "N/A"
//     },
//     {
//       field: "mobile",
//       headerName: "Mobile", 
//       minWidth: 120,
//       renderCell: (row) => row.user?.mobileNumber || "N/A"
//     },
//     {
//       field: "eta",
//       headerName: "ETA",
//       minWidth: 120,
//       sortable: true,
//       renderCell: (row) => new Date(row.eta).toLocaleDateString()
//     },
//     {
//       field: "price",
//       headerName: "Price",
//       minWidth: 100,
//       sortable: true,
//     },
//     {
//       field: "containerType",
//       headerName: "Container Type",
//       minWidth: 150,
//     },
//     {
//       field: "totalContainers",
//       headerName: "Total Containers",
//       minWidth: 120,
//       sortable: true,
//     },
//     {
//       field: "route",
//       headerName: "Departure → Arrival",
//       minWidth: 200,
//       renderCell: (row) => `${row.freightRate?.departurePort} → ${row.freightRate?.arrivalPort}`
//     },
//     {
//       field: "status",
//       headerName: "Status",
//       minWidth: 120,
//       renderCell: (row) => (
//         <span
//           style={{
//             color:
//               row.status === "Confirmed"
//                 ? "green"
//                 : row.status === "Pending"
//                 ? "orange"
//                 : row.status === "Cancelled"
//                 ? "red"
//                 : row.status === "Delivered"
//                 ? "blue"
//                 : "gray",
//             fontWeight: "bold",
//           }}
//         >
//           {row.status}
//         </span>
//       )
//     },
//     {
//       field: "actions",
//       headerName: "Actions",
//       minWidth: 150,
//       renderCell: (row) => (
//         <Stack direction="row" spacing={1}>
//           {getActionIcons(row)}
//         </Stack>
//       )
//     },
//   ];

//   return (
//     <Box sx={{ padding: "20px" }}>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <Tabs
//           value={tabValue}
//           onChange={handleTabChange}
//           variant="scrollable"
//           scrollButtons="auto"
//           sx={{ mb: 2 }}
//         >
//           {statusOptions.map((status, index) => {
//             const count = counts?.[status] ?? 0;
//             return (
//               <Tab
//                 key={status}
//                 label={`${status} (${count})`}
//                 sx={{
//                   textTransform: "none",
//                   fontWeight: filter === status ? "bold" : "normal",
//                 }}
//               />
//             );
//           })}
//         </Tabs>
//         <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
//           <DatePicker
//             value={dateRange}
//             onChange={setDateRange}
//             range
//             numberOfMonths={2}
//             format="YYYY-MM-DD"
//             containerStyle={{ width: "200px" }}
//             style={{
//               borderRadius: "4px",
//               border: "1px solid #ccc",
//               padding: "5px",
//             }}
//           />
//         </Box>
//       </Box>

//       {/* CommonTable Component */}
//       <CommonTable
//         columns={columns}
//         data={bookings}
//         loading={loading}
//         totalCount={totalCount}
//         page={page}
//         rowsPerPage={rowsPerPage}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//         orderBy={orderBy}
//         order={order}
//         onSort={handleSort}
//         maxHeight="60vh"
//         minHeight="60vh"
//       />
//     </Box>
//   );
// };

// export default Booking;





import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Stack,
  Button,
  CircularProgress,
  Tooltip,
  IconButton,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import CheckCircle from "@mui/icons-material/CheckCircle";
import LocalShipping from "@mui/icons-material/LocalShipping";
import Cancel from "@mui/icons-material/Cancel";
import axios from "../../api/axios";
import DatePicker from "react-multi-date-picker";
import CommonTable from "../../components/CommonTable";
// Correct import for React-Bootstrap
// Correct import for Material-UI
import Close from '@mui/icons-material/Close';
const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [counts, setCounts] = useState({
    pending: 0,
    confirmed: 0,
    delivered: 0,
  });
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [sortField, setSortField] = useState("");
  const [sortBy, setSortBy] = useState(-1);
  const [dateRange, setDateRange] = useState([null, null]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("bookingId");
  
  // New states for cancellation modal
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelling, setCancelling] = useState(false);

  const statusOptions = [
    "All",
    "Pending",
    "Confirmed",
    "Delivered",
    "Cancelled",
  ];

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

  const fetchBookings = async () => {
    setLoading(true);
    setError("");
    const payload = {
      limit: rowsPerPage,
      offset: page * rowsPerPage,
      status: filter === "All" ? "" : filter,
      sortField: orderBy,
      sortBy: order === "asc" ? 1 : -1,
      filters: {},
    };

    if (dateRange[0] && dateRange[1]) {
      payload.filters.eta = {
        $gte: dateRange[0],
        $lte: dateRange[1],
      };
    }
    
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://15.134.44.62:8888/api/admin/booking/list",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setBookings(response.data?.data?.bookings || []);
      setTotalCount(response.data?.data?.totalCount || 0);
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to fetch bookings.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus, reason = "") => {
    try {
      const token = localStorage.getItem("token");
      const payload = { status: newStatus };
      
      // Add reason only for cancellation
      if (newStatus === "Cancelled" && reason) {
        payload.reason = reason;
      }
      
      await axios.put(
        `http://15.134.44.62:8888/api/admin/booking/status/${bookingId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      fetchBookings();
      fetchCounts();
    } catch (err) {
      console.error("Status Update Error:", err.response?.data || err);
      alert("Failed to update status");
    }
  };

  // New function to handle cancellation with reason
  const handleCancelWithReason = async () => {
    if (!cancelReason.trim()) {
      alert("Please provide a cancellation reason");
      return;
    }

    setCancelling(true);
    try {
      await handleStatusUpdate(selectedBooking._id, "Cancelled", cancelReason);
      setCancelModalOpen(false);
      setCancelReason("");
      setSelectedBooking(null);
    } catch (err) {
      console.error("Cancellation error:", err);
    } finally {
      setCancelling(false);
    }
  };

  // Function to open cancellation modal
  const openCancelModal = (booking) => {
    setSelectedBooking(booking);
    setCancelReason("");
    setCancelModalOpen(true);
  };

  // Function to close cancellation modal
  const closeCancelModal = () => {
    setCancelModalOpen(false);
    setSelectedBooking(null);
    setCancelReason("");
    setCancelling(false);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    fetchBookings();
    fetchCounts();
  }, [filter, page, rowsPerPage, order, orderBy, dateRange]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setFilter(statusOptions[newValue]);
  };

  const getActionIcons = (b) => {
    const actions = [];

    switch (b.status) {
      case "Pending":
        actions.push(
          <Tooltip title="Confirm" key="confirm">
            <IconButton
              onClick={() => handleStatusUpdate(b._id, "Confirmed")}
              color="success"
            >
              <CheckCircle />
            </IconButton>
          </Tooltip>,
          <Tooltip title="Cancel" key="cancel">
            <IconButton
              onClick={() => openCancelModal(b)}
              color="error"
            >
              <Cancel />
            </IconButton>
          </Tooltip>
        );
        break;

      case "Confirmed":
        actions.push(
          <Tooltip title="Deliver" key="deliver">
            <IconButton
              onClick={() => handleStatusUpdate(b._id, "Delivered")}
              color="info"
            >
              <LocalShipping />
            </IconButton>
          </Tooltip>,
          <Tooltip title="Cancel" key="cancel">
            <IconButton
              onClick={() => openCancelModal(b)}
              color="error"
            >
              <Cancel />
            </IconButton>
          </Tooltip>
        );
        break;

      case "Delivered":
        actions.push(
          <Tooltip title="Delivered" key="delivered">
            <IconButton disabled color="info">
              <LocalShipping />
            </IconButton>
          </Tooltip>
        );
        break;

      case "Cancelled":
        actions.push(
          <Tooltip title="Cancelled" key="cancelled">
            <IconButton disabled color="error">
              <Cancel />
            </IconButton>
          </Tooltip>
        );
        break;

      default:
        actions.push(
          <Tooltip title="Confirm" key="confirm">
            <IconButton
              onClick={() => handleStatusUpdate(b._id, "Confirmed")}
              color="success"
            >
              <CheckCircle />
            </IconButton>
          </Tooltip>,
          <Tooltip title="Deliver" key="deliver">
            <IconButton
              onClick={() => handleStatusUpdate(b._id, "Delivered")}
              color="info"
            >
              <LocalShipping />
            </IconButton>
          </Tooltip>,
          <Tooltip title="Cancel" key="cancel">
            <IconButton
              onClick={() => openCancelModal(b)}
              color="error"
            >
              <Cancel />
            </IconButton>
          </Tooltip>
        );
        break;
    }

    return actions;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (field) => {
    const isAsc = orderBy === field && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(field);
  };

  // Define columns for CommonTable
  const columns = [
    {
      field: "bookingId",
      headerName: "Booking ID",
      minWidth: 120,
      sortable: true,
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      minWidth: 150,
      renderCell: (row) => row.user?.name || "N/A"
    },
    {
      field: "email", 
      headerName: "Email",
      minWidth: 200,
      renderCell: (row) => row.user?.email || "N/A"
    },
    {
      field: "mobile",
      headerName: "Mobile", 
      minWidth: 120,
      renderCell: (row) => row.user?.mobileNumber || "N/A"
    },
    {
      field: "eta",
      headerName: "ETA",
      minWidth: 120,
      sortable: true,
      renderCell: (row) => new Date(row.eta).toLocaleDateString()
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      sortable: true,
    },
    {
      field: "containerType",
      headerName: "Container Type",
      minWidth: 150,
    },
    {
      field: "totalContainers",
      headerName: "Total Containers",
      minWidth: 120,
      sortable: true,
    },
    {
      field: "route",
      headerName: "Departure → Arrival",
      minWidth: 200,
      renderCell: (row) => `${row.freightRate?.departurePort} → ${row.freightRate?.arrivalPort}`
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
      renderCell: (row) => (
        <span
          style={{
            color:
              row.status === "Confirmed"
                ? "green"
                : row.status === "Pending"
                ? "orange"
                : row.status === "Cancelled"
                ? "red"
                : row.status === "Delivered"
                ? "blue"
                : "gray",
            fontWeight: "bold",
          }}
        >
          {row.status}
        </span>
      )
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      renderCell: (row) => (
        <Stack direction="row" spacing={1}>
          {getActionIcons(row)}
        </Stack>
      )
    },
  ];

  return (
    <Box sx={{ padding: "20px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
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
                  fontWeight: filter === status ? "bold" : "normal",
                }}
              />
            );
          })}
        </Tabs>
        <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
          <DatePicker
            value={dateRange}
            onChange={setDateRange}
            range
            numberOfMonths={2}
            format="YYYY-MM-DD"
            containerStyle={{ width: "200px" }}
            style={{
              borderRadius: "4px",
              border: "1px solid #ccc",
              padding: "5px",
            }}
          />
        </Box>
      </Box>

      {/* CommonTable Component */}
      <CommonTable
        columns={columns}
        data={bookings}
        loading={loading}
        totalCount={totalCount}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        orderBy={orderBy}
        order={order}
        onSort={handleSort}
        maxHeight="60vh"
        minHeight="60vh"
      />

      {/* Cancellation Reason Modal */}
      {/* <Dialog open={cancelModalOpen} onClose={closeCancelModal} maxWidth="sm" fullWidth>
        <DialogTitle>
          Cancel Booking
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Please provide a reason for cancelling booking{" "}
            <strong>{selectedBooking?.bookingId}</strong>
          </Typography>
          <TextField
            autoFocus
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            placeholder="Enter cancellation reason..."
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            disabled={cancelling}
          />
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={closeCancelModal} 
            disabled={cancelling}
            color="inherit"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleCancelWithReason} 
            disabled={cancelling || !cancelReason.trim()}
            color="error"
            variant="contained"
            startIcon={cancelling ? <CircularProgress size={20} /> : null}
          >
            {cancelling ? "Cancelling..." : "Confirm Cancellation"}
          </Button>
        </DialogActions>
      </Dialog> */}


     <Dialog 
  open={cancelModalOpen} 
  onClose={closeCancelModal} 
  maxWidth="sm" 
  fullWidth
  PaperProps={{
    sx: {
      borderRadius: 3,
      boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
      overflow: 'hidden'
    }
  }}
>
  {/* Header with #ff6b35 Color */}
  <DialogTitle sx={{ 
    background: 'linear-gradient(135deg, #ff6b35 0%, #e55a2b 100%)',
    color: 'white',
    py: 2,
    textAlign: 'center',
    position: 'relative'
  }}>
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      gap: 1
    }}>
      <Cancel sx={{ fontSize: 28, color: 'white' }} />
      <Typography variant="h6" component="div" fontWeight="bold">
        Cancel Booking
      </Typography>
    </Box>
    <IconButton
      aria-label="close"
      onClick={closeCancelModal}
      sx={{
        position: 'absolute',
        right: 16,
        top: 16,
        color: 'white',
        backgroundColor: 'rgba(255,255,255,0.2)',
        '&:hover': {
          backgroundColor: 'rgba(255,255,255,0.3)',
        }
      }}
    >
      <Close />
    </IconButton>
  </DialogTitle>

  <DialogContent sx={{ p: 3 }}>
    {/* Booking Info Card */}
    <Box sx={{
      backgroundColor: '#fff8f6',
      border: '1px solid #ffebe6',
      borderRadius: 2,
      p: 2,
      mb: 3
    }}>
      <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontWeight: 'medium' }}>
        Booking Reference:
      </Typography>
      <Typography variant="h6" sx={{ color: '#ff6b35', fontWeight: 'bold' }}>
        {selectedBooking?.bookingId}
      </Typography>
    </Box>

    <Typography variant="body1" sx={{ mb: 2, color: 'text.primary', fontWeight: '500' }}>
      Please provide a reason for cancellation
    </Typography>
    
    {/* <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
      This reason will be shared with the customer and cannot be changed later.
    </Typography> */}

    <TextField
      autoFocus
      multiline
      rows={4}
      fullWidth
      variant="outlined"
      placeholder="Enter detailed cancellation reason here..."
      value={cancelReason}
      onChange={(e) => setCancelReason(e.target.value)}
      disabled={cancelling}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
          transition: 'all 0.3s ease',
          '&:hover fieldset': {
            borderColor: '#ff6b35',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#ff6b35',
            borderWidth: 2,
          },
        },
        '& .MuiInputBase-input': {
          color: 'text.primary',
        }
      }}
    />
    
    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
      Minimum 10 characters required
    </Typography>
  </DialogContent>

  <DialogActions sx={{ 
    p: 3, 
    gap: 2,
    borderTop: '1px solid #f0f0f0'
  }}>
    <Button 
      onClick={closeCancelModal} 
      disabled={cancelling}
      variant="outlined"
      startIcon={<Close />}
      sx={{ 
        borderRadius: 2,
        px: 4,
        py: 1,
        textTransform: 'none',
        fontWeight: '600',
        borderColor: 'grey.400',
        color: 'grey.700',
        '&:hover': {
          borderColor: 'grey.600',
          backgroundColor: 'grey.50'
        }
      }}
    >
      Keep Booking
    </Button>
    <Button 
      onClick={handleCancelWithReason} 
      disabled={cancelling || !cancelReason.trim() || cancelReason.trim().length < 10}
      variant="contained"
      startIcon={cancelling ? <CircularProgress size={20} color="inherit" /> : <Cancel />}
      sx={{ 
        borderRadius: 2,
        px: 4,
        py: 1,
        textTransform: 'none',
        fontWeight: 'bold',
        fontSize: '1rem',
        background: 'linear-gradient(135deg, #ff6b35 0%, #e55a2b 100%)',
        boxShadow: '0 4px 14px rgba(255, 107, 53, 0.4)',
        color: 'white',
        '&:hover': {
          background: 'linear-gradient(135deg, #ff5a22 0%, #d4491a 100%)',
          boxShadow: '0 6px 20px rgba(255, 107, 53, 0.6)',
          transform: 'translateY(-1px)',
        },
        '&:disabled': {
          background: 'grey.300',
          boxShadow: 'none',
          transform: 'none',
        },
        transition: 'all 0.3s ease'
      }}
    >
      {cancelling ? "Cancelling..." : "Confirm Cancellation"}
    </Button>
  </DialogActions>
</Dialog>
    </Box>
  );
};

export default Booking;