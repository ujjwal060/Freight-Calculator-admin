



// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   CircularProgress,
//   IconButton,
//   TableSortLabel,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import {
//   getFreightRates,
//   addFreightRate,
//   updateFreightRate,
//   deleteFreightRate,
// } from "../../api/freightrate";
// import AddFreightDialog from "./AddFreightDialog.jsx";

// const FreightRate = () => {
//   const [freightRates, setFreightRates] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [selectedId, setSelectedId] = useState(null);
//   const [formData, setFormData] = useState({
//     containerSize: "",
//     departureCountry: "",
//     departurePort: "",
//     arrivalCountry: "",
//     arrivalPort: "",
//     basePriceDry: "",
//     basePriceReefer: "",
//   });
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [totalCount, setTotalCount] = useState(0);
//   const [loading, setLoading] = useState(false);

//   // Sorting state for backend
//   const [orderBy, setOrderBy] = useState(""); // "basePrice.Dry" / "basePrice.Reefer" etc.
//   const [order, setOrder] = useState("asc"); // asc or desc

//   // Fetch freight rates from API (backend sorted)
//   const fetchFreightRates = async () => {
//     setLoading(true);
//     try {
//       const payload = {
//         limit: rowsPerPage,
//         offset: page * rowsPerPage,
//         sortField: orderBy,          // backend ke liye
//         sortBy: order === "asc" ? 1 : -1,
//       };
//       const res = await getFreightRates(payload);
//       setFreightRates(res.data || []);
//       setTotalCount(res.totalCount || 0);
//     } catch (err) {
//       console.error("Error fetching freight rates:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFreightRates();
//   }, [page, rowsPerPage, order, orderBy]);

//   const handleSaveFreight = async () => {
//     try {
//       const payload = {
//         containerSize: formData.containerSize,
//         departureCountry: formData.departureCountry,
//         departurePort: formData.departurePort,
//         arrivalCountry: formData.arrivalCountry,
//         arrivalPort: formData.arrivalPort,
//         basePrice: {
//           Dry: Number(formData.basePriceDry),
//           Reefer: Number(formData.basePriceReefer),
//         },
//       };
//       if (editMode) await updateFreightRate(selectedId, payload);
//       else await addFreightRate(payload);

//       setOpen(false);
//       setEditMode(false);
//       setFormData({
//         containerSize: "",
//         departureCountry: "",
//         departurePort: "",
//         arrivalCountry: "",
//         arrivalPort: "",
//         basePriceDry: "",
//         basePriceReefer: "",
//       });
//       fetchFreightRates();
//     } catch (err) {
//       console.error("Error saving freight rate:", err);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this rate?")) return;
//     try {
//       await deleteFreightRate(id);
//       fetchFreightRates();
//     } catch (err) {
//       console.error("Error deleting:", err);
//     }
//   };

//   const handleEdit = (rate) => {
//     setFormData({
//       containerSize: rate.containerSize,
//       departureCountry: rate.departureCountry,
//       departurePort: rate.departurePort,
//       arrivalCountry: rate.arrivalCountry,
//       arrivalPort: rate.arrivalPort,
//       basePriceDry: rate.basePrice?.Dry,
//       basePriceReefer: rate.basePrice?.Reefer,
//     });
//     setSelectedId(rate._id);
//     setEditMode(true);
//     setOpen(true);
//   };

//   const handleSort = (field) => {
//     const isAsc = orderBy === field && order === "asc";
//     setOrder(isAsc ? "desc" : "asc");
//     setOrderBy(field); // "basePrice.Dry" / "basePrice.Reefer"
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 2,
//         }}
//       >
//         {/* <Typography variant="h5" sx={{ color: "#ff6b35", fontWeight: "bold" }}>
//           Freight Rate Management
//         </Typography> */}
//         <Button
//           variant="contained"
//           sx={{ background: "#ff6b35", textTransform: "none" }}
//           startIcon={<AddIcon />}
//           onClick={() => {
//             setFormData({
//               containerSize: "",
//               departureCountry: "",
//               departurePort: "",
//               arrivalCountry: "",
//               arrivalPort: "",
//               basePriceDry: "",
//               basePriceReefer: "",
//             });
//             setEditMode(false);
//             setOpen(true);
//           }}
//         >
//           Add
//         </Button>
//       </Box>

//       <AddFreightDialog
//         open={open}
//         handleClose={() => setOpen(false)}
//         handleAdd={handleSaveFreight}
//         formData={formData}
//         handleChange={(e) =>
//           setFormData({ ...formData, [e.target.name]: e.target.value })
//         }
//         editMode={editMode}
//       />

//       <Paper sx={{ width: "100%", overflow: "hidden" }}>
//         {loading ? (
//           <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
//             <CircularProgress sx={{ color: "#ff6b35" }} />
//           </Box>
//         ) : (
//           <>
//             <TableContainer sx={{ maxHeight: "60vh", minHeight: "60vh" }}>
//               <Table stickyHeader>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell sx={{ background: "#ff6b35", color: "#fff" }}>
//                       Container Size
//                     </TableCell>
//                     <TableCell sx={{ background: "#ff6b35", color: "#fff" }}>
//                       Departure
//                     </TableCell>
//                     <TableCell sx={{ background: "#ff6b35", color: "#fff" }}>
//                       Arrival
//                     </TableCell>
//                     {/* <TableCell sx={{ background: "#ff6b35", color: "#fff" }}>
//                       <TableSortLabel
//                         active={orderBy === "basePrice.Dry"}
//                         direction={orderBy === "basePrice.Dry" ? order : "asc"}
//                         onClick={() => handleSort("basePrice.Dry")}
//                         hideSortIcon={false}
//                         sx={{
//                           color: "#fff",
//                           "& .MuiTableSortLabel-icon": { color: "#fff !important" },
//                         }}
//                       >
//                         Base Price (Dry)
//                       </TableSortLabel>
//                     </TableCell> */}
//                     <TableCell sx={{ background: "#ff6b35", color: "#fff" }}>
//   <TableSortLabel
//     active={orderBy === "basePrice.Dry"}
//     direction={orderBy === "basePrice.Dry" ? order : "asc"}
//     onClick={() => handleSort("basePrice.Dry")}
//     hideSortIcon={false}
//     sx={{
//       color: "#fff",
//       display: "flex",
//       alignItems: "center",
//       gap: "4px",
//       "& .MuiTableSortLabel-icon": { color: "#fff !important" },
//     }}
//   >
//     <Box component="span" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//       Base Price (Dry)
//       <span style={{ fontWeight: "bold", marginLeft: "4px" }}>$</span>
//     </Box>
//   </TableSortLabel>
// </TableCell>

//                <TableCell sx={{ background: "#ff6b35", color: "#fff" }}>
//   <TableSortLabel
//     active={orderBy === "basePrice.Reefer"}
//     direction={orderBy === "basePrice.Reefer" ? order : "asc"}
//     onClick={() => handleSort("basePrice.Reefer")}
//     hideSortIcon={false}
//     sx={{
//       color: "#fff",
//       display: "flex",
//       alignItems: "center",
//       gap: "4px",
//       "& .MuiTableSortLabel-icon": { color: "#fff !important" },
//     }}
//   >
//     <Box component="span" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//       Base Price (Reefer)
//       <span style={{ fontWeight: "bold", marginLeft: "4px" }}>$</span>
//     </Box>
//   </TableSortLabel>
// </TableCell>

//                     <TableCell sx={{ background: "#ff6b35", color: "#fff" }}>
//                       Actions
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>

//                 <TableBody>
//                   {freightRates.length === 0 ? (
//                     <TableRow>
//                       <TableCell colSpan={6} align="center">
//                         No Data Available
//                       </TableCell>
//                     </TableRow>
//                   ) : (
//                     freightRates.map((rate) => (
//                       <TableRow key={rate._id}>
//                         <TableCell>{rate.containerSize}</TableCell>
//                         <TableCell>
//                           {rate.departureCountry} - {rate.departurePort}
//                         </TableCell>
//                         <TableCell>
//                           {rate.arrivalCountry} - {rate.arrivalPort}
//                         </TableCell>
//                         <TableCell>{rate.basePrice?.Dry}</TableCell>
//                         <TableCell>{rate.basePrice?.Reefer}</TableCell>
//                         <TableCell>
//                           <IconButton color="primary" onClick={() => handleEdit(rate)}>
//                             <EditIcon />
//                           </IconButton>
//                           <IconButton color="error" onClick={() => handleDelete(rate._id)}>
//                             <DeleteIcon />
//                           </IconButton>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>

//             <TablePagination
//               component="div"
//               count={totalCount}
//               page={page}
//               onPageChange={(e, newPage) => setPage(newPage)}
//               rowsPerPage={rowsPerPage}
//               onRowsPerPageChange={(e) => {
//                 setRowsPerPage(parseInt(e.target.value, 10));
//                 setPage(0);
//               }}
//               rowsPerPageOptions={[10, 20, 50]}
//             />
//           </>
//         )}
//       </Paper>
//     </Box>
//   );
// };

// export default FreightRate;



// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   IconButton,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import {
//   getFreightRates,
//   addFreightRate,
//   updateFreightRate,
//   deleteFreightRate,
// } from "../../api/freightrate";
// import AddFreightDialog from "./AddFreightDialog.jsx";
// import CommonTable from "../../components/CommonTable";

// const FreightRate = () => {
//   const [freightRates, setFreightRates] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [selectedId, setSelectedId] = useState(null);
//   const [formData, setFormData] = useState({
//     containerSize: "",
//     departureCountry: "",
//     departurePort: "",
//     arrivalCountry: "",
//     arrivalPort: "",
//     basePriceDry: "",
//     basePriceReefer: "",
//   });
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [totalCount, setTotalCount] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [orderBy, setOrderBy] = useState("");
//   const [order, setOrder] = useState("asc");

//   const columns = [
//     { 
//       field: "containerSize", 
//       headerName: "Container Size", 
//       minWidth: 150 
//     },
//     { 
//       field: "departure", 
//       headerName: "Departure", 
//       minWidth: 200,
//       renderCell: (row) => `${row.departureCountry} - ${row.departurePort}`
//     },
//     { 
//       field: "arrival", 
//       headerName: "Arrival", 
//       minWidth: 200,
//       renderCell: (row) => `${row.arrivalCountry} - ${row.arrivalPort}`
//     },
//     { 
//       field: "basePrice.Dry", 
//       headerName: "Base Price (Dry) $", 
//       minWidth: 150,
//       sortable: true,
//       renderCell: (row) => row.basePrice?.Dry || "N/A"
//     },
//     { 
//       field: "basePrice.Reefer", 
//       headerName: "Base Price (Reefer) $", 
//       minWidth: 150,
//       sortable: true,
//       renderCell: (row) => row.basePrice?.Reefer || "N/A"
//     },
//     { 
//       field: "actions", 
//       headerName: "Actions", 
//       minWidth: 120,
//       renderCell: (row) => (
//         <Box>
//           <IconButton 
//             color="primary" 
//             onClick={() => handleEdit(row)}
//             size="small"
//             sx={{ mr: 0.5 }}
//           >
//             <EditIcon />
//           </IconButton>
//           <IconButton 
//             color="error" 
//             onClick={() => handleDelete(row._id)}
//             size="small"
//           >
//             <DeleteIcon />
//           </IconButton>
//         </Box>
//       )
//     },
//   ];

//   const fetchFreightRates = async () => {
//     setLoading(true);
//     try {
//       const payload = {
//         limit: rowsPerPage,
//         offset: page * rowsPerPage,
//         sortField: orderBy,
//         sortBy: order === "asc" ? 1 : -1,
//       };
//       const res = await getFreightRates(payload);
//       setFreightRates(res.data || []);
//       setTotalCount(res.totalCount || 0);
//     } catch (err) {
//       console.error("Error fetching freight rates:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSaveFreight = async () => {
//     try {
//       const payload = {
//         containerSize: formData.containerSize,
//         departureCountry: formData.departureCountry,
//         departurePort: formData.departurePort,
//         arrivalCountry: formData.arrivalCountry,
//         arrivalPort: formData.arrivalPort,
//         basePrice: {
//           Dry: Number(formData.basePriceDry),
//           Reefer: Number(formData.basePriceReefer),
//         },
//       };
//       if (editMode) {
//         await updateFreightRate(selectedId, payload);
//       } else {
//         await addFreightRate(payload);
//       }

//       setOpen(false);
//       setEditMode(false);
//       setFormData({
//         containerSize: "",
//         departureCountry: "",
//         departurePort: "",
//         arrivalCountry: "",
//         arrivalPort: "",
//         basePriceDry: "",
//         basePriceReefer: "",
//       });
//       fetchFreightRates();
//     } catch (err) {
//       console.error("Error saving freight rate:", err);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this rate?")) return;
//     try {
//       await deleteFreightRate(id);
//       fetchFreightRates();
//     } catch (err) {
//       console.error("Error deleting:", err);
//     }
//   };

//   const handleEdit = (rate) => {
//     setFormData({
//       containerSize: rate.containerSize,
//       departureCountry: rate.departureCountry,
//       departurePort: rate.departurePort,
//       arrivalCountry: rate.arrivalCountry,
//       arrivalPort: rate.arrivalPort,
//       basePriceDry: rate.basePrice?.Dry || "",
//       basePriceReefer: rate.basePrice?.Reefer || "",
//     });
//     setSelectedId(rate._id);
//     setEditMode(true);
//     setOpen(true);
//   };

//   const handleSort = (field) => {
//     const isAsc = orderBy === field && order === "asc";
//     setOrder(isAsc ? "desc" : "asc");
//     setOrderBy(field);
//   };

//   const handleChangePage = (event, newPage) => setPage(newPage);
  
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   useEffect(() => {
//     fetchFreightRates();
//   }, [page, rowsPerPage, order, orderBy]);

//   return (
//     <Box sx={{ p: 3 }}>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 2,
//         }}
//       >
//         <Button
//           variant="contained"
//           sx={{ 
//             background: "#ff6b35", 
//             textTransform: "none",
//             "&:hover": {
//               background: "#e55a2b"
//             }
//           }}
//           startIcon={<AddIcon />}
//           onClick={() => {
//             setFormData({
//               containerSize: "",
//               departureCountry: "",
//               departurePort: "",
//               arrivalCountry: "",
//               arrivalPort: "",
//               basePriceDry: "",
//               basePriceReefer: "",
//             });
//             setEditMode(false);
//             setOpen(true);
//           }}
//         >
//           Add Freight Rate
//         </Button>
//       </Box>

//       <AddFreightDialog
//         open={open}
//         handleClose={() => setOpen(false)}
//         handleAdd={handleSaveFreight}
//         formData={formData}
//         handleChange={(e) =>
//           setFormData({ ...formData, [e.target.name]: e.target.value })
//         }
//         editMode={editMode}
//       />

//       <CommonTable
//         columns={columns}
//         data={freightRates}
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

// export default FreightRate;



import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getFreightRates,
  addFreightRate,
  updateFreightRate,
  deleteFreightRate,
} from "../../api/freightrate";
import AddFreightDialog from "./AddFreightDialog.jsx";
import CommonTable from "../../components/CommonTable";

const FreightRate = () => {
  const [freightRates, setFreightRates] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState({
    containerSize: "",
    departureCountry: "",
    departurePort: "",
    arrivalCountry: "",
    arrivalPort: "",
    basePriceDry: "",
    basePriceReefer: "",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");

  const columns = [
    { 
      field: "containerSize", 
      headerName: "Container Size", 
      minWidth: 150 
    },
    { 
      field: "departure", 
      headerName: "Departure", 
      minWidth: 200,
      renderCell: (row) => `${row.departureCountry} - ${row.departurePort}`
    },
    { 
      field: "arrival", 
      headerName: "Arrival", 
      minWidth: 200,
      renderCell: (row) => `${row.arrivalCountry} - ${row.arrivalPort}`
    },
    { 
      field: "basePrice.Dry", 
      headerName: "Base Price (Dry) $", 
      minWidth: 150,
      sortable: true,
      renderCell: (row) => row.basePrice?.Dry || "N/A"
    },
    { 
      field: "basePrice.Reefer", 
      headerName: "Base Price (Reefer) $", 
      minWidth: 150,
      sortable: true,
      renderCell: (row) => row.basePrice?.Reefer || "N/A"
    },
    { 
      field: "actions", 
      headerName: "Actions", 
      minWidth: 120,
      renderCell: (row) => (
        <Box>
          <IconButton 
            color="primary" 
            onClick={() => handleEdit(row)}
            size="small"
            sx={{ mr: 0.5 }}
          >
            <EditIcon />
          </IconButton>
          <IconButton 
            color="error" 
            onClick={() => handleDelete(row._id)}
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )
    },
  ];

  const fetchFreightRates = async () => {
    setLoading(true);
    try {
      const payload = {
        limit: rowsPerPage,
        offset: page * rowsPerPage,
        sortField: orderBy,
        sortBy: order === "asc" ? 1 : -1,
      };
      const res = await getFreightRates(payload);
      setFreightRates(res.data || []);
      setTotalCount(res.totalCount || 0);
    } catch (err) {
      console.error("Error fetching freight rates:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveFreight = async () => {
    try {
      const payload = {
        containerSize: formData.containerSize,
        departureCountry: formData.departureCountry,
        departurePort: formData.departurePort,
        arrivalCountry: formData.arrivalCountry,
        arrivalPort: formData.arrivalPort,
        basePrice: {
          Dry: Number(formData.basePriceDry),
          Reefer: Number(formData.basePriceReefer),
        },
      };
      if (editMode) {
        await updateFreightRate(selectedId, payload);
      } else {
        await addFreightRate(payload);
      }

      setOpen(false);
      setEditMode(false);
      setFormData({
        containerSize: "",
        departureCountry: "",
        departurePort: "",
        arrivalCountry: "",
        arrivalPort: "",
        basePriceDry: "",
        basePriceReefer: "",
      });
      fetchFreightRates();
    } catch (err) {
      console.error("Error saving freight rate:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this rate?")) return;
    try {
      await deleteFreightRate(id);
      fetchFreightRates();
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  const handleEdit = (rate) => {
    setFormData({
      containerSize: rate.containerSize,
      departureCountry: rate.departureCountry,
      departurePort: rate.departurePort,
      arrivalCountry: rate.arrivalCountry,
      arrivalPort: rate.arrivalPort,
      basePriceDry: rate.basePrice?.Dry || "",
      basePriceReefer: rate.basePrice?.Reefer || "",
    });
    setSelectedId(rate._id);
    setEditMode(true);
    setOpen(true);
  };

  const handleSort = (field) => {
    const isAsc = orderBy === field && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(field);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    fetchFreightRates();
  }, [page, rowsPerPage, order, orderBy]);

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end", // ✅ Yeh line change ki hai - button right side aa jayega
          alignItems: "center",
          mb: 2,
        }}
      >
        <Button
          variant="contained"
          sx={{ 
            background: "#ff6b35", 
            textTransform: "none",
            "&:hover": {
              background: "#e55a2b"
            }
          }}
          startIcon={<AddIcon />}
          onClick={() => {
            setFormData({
              containerSize: "",
              departureCountry: "",
              departurePort: "",
              arrivalCountry: "",
              arrivalPort: "",
              basePriceDry: "",
              basePriceReefer: "",
            });
            setEditMode(false);
            setOpen(true);
          }}
        >
          Add Freight Rate
        </Button>
      </Box>

      <AddFreightDialog
        open={open}
        handleClose={() => setOpen(false)}
        handleAdd={handleSaveFreight}
        formData={formData}
        handleChange={(e) =>
          setFormData({ ...formData, [e.target.name]: e.target.value })
        }
        editMode={editMode}
      />

      <CommonTable
        columns={columns}
        data={freightRates}
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
    </Box>
  );
};

export default FreightRate;