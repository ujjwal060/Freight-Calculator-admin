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

//   // Fetch freight rates
//   const fetchFreightRates = async () => {
//     try {
//       setLoading(true);
//       const payload = { limit: rowsPerPage, offset: page * rowsPerPage };
//       const res = await getFreightRates(payload);
//       setFreightRates(res.data || []);
//       setTotalCount(res.totalCount || 0);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching freight rates:", err);
//       setLoading(false);
//     }
//   };

//   // Add / Update freight rate
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

//   // Edit freight rate
//   const handleEdit = (rate) => {
//     setSelectedId(rate._id);
//     setFormData({
//       containerSize: rate.containerSize,
//       departureCountry: rate.departureCountry,
//       departurePort: rate.departurePort,
//       arrivalCountry: rate.arrivalCountry,
//       arrivalPort: rate.arrivalPort,
//       basePriceDry: rate.basePrice?.Dry || "",
//       basePriceReefer: rate.basePrice?.Reefer || "",
//     });
//     setEditMode(true);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setEditMode(false);
//     setFormData({
//       containerSize: "",
//       departureCountry: "",
//       departurePort: "",
//       arrivalCountry: "",
//       arrivalPort: "",
//       basePriceDry: "",
//       basePriceReefer: "",
//     });
//   };

//   // Delete freight rate
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this freight rate?"))
//       return;
//     try {
//       await deleteFreightRate(id);
//       fetchFreightRates();
//     } catch (err) {
//       console.error("Error deleting freight rate:", err);
//     }
//   };

//   useEffect(() => {
//     fetchFreightRates();
//   }, [page, rowsPerPage]);

//   return (
//     <Box sx={{ p: 3 }}>
//       {/* Heading & Add Button */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 2,
//         }}
//       >
//         <Typography variant="h5" sx={{ color: "#ff6b35", fontWeight: "bold" }}>
//           {/* Freight Rate Management */}
//         </Typography>

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
//             }); // ✅ Reset form data
//             setEditMode(false); // ✅ Edit mode off
//             setOpen(true); // ✅ Open dialog
//           }}
//         >
//           Add
//         </Button>
//       </Box>

//       {/* Add/Edit Dialog */}
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
//             <TableContainer
//               sx={{
//                 maxHeight: "60vh",
//                 minHeight: "60vh",
//                 overflow: "auto",
//                 width: "100%",
//               }}
//             >
//               <Table stickyHeader aria-label="sticky table">
//                 <TableHead>
//                   <TableRow
//                     className="table-custom"
//                     sx={{ background: "#ff6b35" }}
//                   >
//                     <TableCell sx={{ color: "#fff" }}>Container Size</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>Departure</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>Arrival</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>
//                       Base Price (Dry)
//                     </TableCell>
//                     <TableCell sx={{ color: "#fff" }}>
//                       Base Price (Reefer)
//                     </TableCell>
//                     <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody
//                   sx={{
//                     maxHeight: "inherit",
//                     overflow: "scroll",
//                     overflowX: "hidden",
//                   }}
//                 >
//                   {freightRates.map((rate) => (
//                     <TableRow key={rate._id}>
//                       <TableCell>{rate.containerSize}</TableCell>
//                       <TableCell>
//                         {rate.departureCountry} - {rate.departurePort}
//                       </TableCell>
//                       <TableCell>
//                         {rate.arrivalCountry} - {rate.arrivalPort}
//                       </TableCell>
//                       <TableCell>{rate.basePrice?.Dry}</TableCell>
//                       <TableCell>{rate.basePrice?.Reefer}</TableCell>
//                       <TableCell>
//                         <TableCell sx={{ padding: "4px" }}>
//                           <IconButton
//                             color="primary"
//                             onClick={() => handleEdit(rate)}
//                           >
//                             <EditIcon />
//                           </IconButton>
//                         </TableCell>
//                         <TableCell sx={{ padding: "4px" }}>
//                           <IconButton
//                             color="error"
//                             onClick={() => handleDelete(rate._id)}
//                           >
//                             <DeleteIcon />
//                           </IconButton>
//                         </TableCell>
//                       </TableCell>
//                     </TableRow>
//                   ))}
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
//             />
//           </>
//         )}
//       </Paper>
//     </Box>
//   );
// };

// export default FreightRate;


import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  CircularProgress,
  IconButton,
  TableSortLabel, // ✅ Sorting ke liye
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

  // ✅ Sorting states
  const [order, setOrder] = useState("asc"); // asc ya desc
  const [orderBy, setOrderBy] = useState(""); // kis column par sort



    // 🔹 Yeh function add karo
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
  // Fetch freight rates
  const fetchFreightRates = async () => {
    try {
      setLoading(true);
      const payload = { limit: rowsPerPage, offset: page * rowsPerPage };
      const res = await getFreightRates(payload);
      setFreightRates(res.data || []);
      setTotalCount(res.totalCount || 0);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching freight rates:", err);
      setLoading(false);
    }
  };

  // Sorting handle
  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Sorting function
  const sortedRates = [...freightRates].sort((a, b) => {
    if (!orderBy) return 0;
    const aValue = orderBy === "Dry" ? a.basePrice?.Dry : a.basePrice?.Reefer;
    const bValue = orderBy === "Dry" ? b.basePrice?.Dry : b.basePrice?.Reefer;

    if (aValue < bValue) return order === "asc" ? -1 : 1;
    if (aValue > bValue) return order === "asc" ? 1 : -1;
    return 0;
  });

  useEffect(() => {
    fetchFreightRates();
  }, [page, rowsPerPage]);

  return (
    <Box sx={{ p: 3 }}>
      {/* Heading & Add Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5" sx={{ color: "#ff6b35", fontWeight: "bold" }}>
          Freight Rate Management
        </Typography>

        <Button
          variant="contained"
          sx={{ background: "#ff6b35", textTransform: "none" }}
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
          Add
        </Button>
      </Box>

      {/* Add/Edit Dialog */}
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

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
            <CircularProgress sx={{ color: "#ff6b35" }} />
          </Box>
        ) : (
          <>
            <TableContainer
              sx={{
                maxHeight: "60vh",
                minHeight: "60vh",
                overflow: "auto",
                width: "100%",
              }}
            >
              <Table stickyHeader aria-label="sticky table">
               <TableHead>
  <TableRow>
    <TableCell sx={{ background: "#ff6b35", color: "#fff" }}>
      Container Size
    </TableCell>
    <TableCell sx={{ background: "#ff6b35", color: "#fff" }}>
      Departure
    </TableCell>
    <TableCell sx={{ background: "#ff6b35", color: "#fff" }}>
      Arrival
    </TableCell>
    <TableCell sx={{ background: "#ff6b35", color: "#fff" }}>
  <TableSortLabel
  active={orderBy === "Dry"}
  direction={orderBy === "Dry" ? order : "asc"}
  onClick={() => handleSort("Dry")}
  hideSortIcon={false} // ✅ arrow hamesha dikhe
  sx={{
    color: "#fff",
    "& .MuiTableSortLabel-icon": {
      color: "#fff !important",
    },
  }}
>
  Base Price (Dry)
</TableSortLabel>
    </TableCell>
    <TableCell sx={{ background: "#ff6b35", color: "#fff" }}>
   <TableSortLabel
  active={orderBy === "Reefer"}
  direction={orderBy === "Reefer" ? order : "asc"}
  onClick={() => handleSort("Reefer")}
  hideSortIcon={false} // ✅ arrow hamesha dikhe
  sx={{
    color: "#fff",
    "& .MuiTableSortLabel-icon": {
      color: "#fff !important",
    },
  }}
>
  Base Price (Reefer)
</TableSortLabel>
    </TableCell>
    <TableCell sx={{ background: "#ff6b35", color: "#fff" }}>
      Actions
    </TableCell>
  </TableRow>
</TableHead>


                <TableBody>
                  {sortedRates.map((rate) => (
                    <TableRow key={rate._id}>
                      <TableCell>{rate.containerSize}</TableCell>
                      <TableCell>
                        {rate.departureCountry} - {rate.departurePort}
                      </TableCell>
                      <TableCell>
                        {rate.arrivalCountry} - {rate.arrivalPort}
                      </TableCell>
                      <TableCell>{rate.basePrice?.Dry}</TableCell>
                      <TableCell>{rate.basePrice?.Reefer}</TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          onClick={() => handleEdit(rate)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(rate._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <TablePagination
              component="div"
              count={totalCount}
              page={page}
              onPageChange={(e, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
            /> */}

            <TablePagination
  component="div"
  count={totalCount}
  page={page}
  onPageChange={(e, newPage) => setPage(newPage)}
  rowsPerPage={rowsPerPage}
  onRowsPerPageChange={(e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  }}
  rowsPerPageOptions={[10, 20, 50]} // ✅ sirf ye 3 options dikhenge
/>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default FreightRate;
