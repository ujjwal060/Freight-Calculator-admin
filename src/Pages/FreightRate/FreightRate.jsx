

import React, { useEffect, useState } from "react";
import {
  Box, Button, Typography, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TablePagination, CircularProgress
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add"; // ✅ Import Add icon
import { getFreightRates, addFreightRate } from "../../api/freightrate";
import AddFreightDialog from "./AddFreightDialog.jsx";

const FreightRate = () => {
  const [freightRates, setFreightRates] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    containerSize: "",
    departureCountry: "",
    departurePort: "",
    arrivalCountry: "",
    arrivalPort: "",
    basePriceDry: "",
    basePriceReefer: ""
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

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

  const handleAddFreight = async () => {
    try {
      const payload = {
        containerSize: formData.containerSize,
        departureCountry: formData.departureCountry,
        departurePort: formData.departurePort,
        arrivalCountry: formData.arrivalCountry,
        arrivalPort: formData.arrivalPort,
        basePrice: {
          Dry: Number(formData.basePriceDry),
          Reefer: Number(formData.basePriceReefer)
        }
      };
      await addFreightRate(payload);
      setOpen(false);
      setFormData({
        containerSize: "",
        departureCountry: "",
        departurePort: "",
        arrivalCountry: "",
        arrivalPort: "",
        basePriceDry: "",
        basePriceReefer: ""
      });
      fetchFreightRates();
    } catch (err) {
      console.error("Error adding freight rate:", err);
    }
  };

  useEffect(() => {
    fetchFreightRates();
  }, [page, rowsPerPage]);

  return (
 

    <Box sx={{ p: 3 }}>
  {/* Heading aur Button ek hi line mein */}
  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
    <Typography variant="h5" sx={{ color: "#ff6b35", fontWeight: "bold" }}>
      Freight Rate Management
    </Typography>

    {/* Button right side par aayega */}
    <Button
      variant="contained"
      sx={{ background: "#ff6b35", textTransform: "none" }}
      startIcon={<AddIcon />}
      onClick={() => setOpen(true)}
    >
      Add
    </Button>
  </Box>

  <AddFreightDialog
    open={open}
    handleClose={() => setOpen(false)}
    handleAdd={handleAddFreight}
    formData={formData}
    handleChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
  />

  <Paper>
    {loading ? (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress sx={{ color: "#ff6b35" }} />
      </Box>
    ) : (
      <>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ background: "#ff6b35" }}>
                <TableCell sx={{ color: "#fff" }}>Container Size</TableCell>
                <TableCell sx={{ color: "#fff" }}>Departure</TableCell>
                <TableCell sx={{ color: "#fff" }}>Arrival</TableCell>
                <TableCell sx={{ color: "#fff" }}>Base Price (Dry)</TableCell>
                <TableCell sx={{ color: "#fff" }}>Base Price (Reefer)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {freightRates.map((rate) => (
                <TableRow key={rate._id}>
                  <TableCell>{rate.containerSize}</TableCell>
                  <TableCell>{rate.departureCountry} - {rate.departurePort}</TableCell>
                  <TableCell>{rate.arrivalCountry} - {rate.arrivalPort}</TableCell>
                  <TableCell>{rate.basePrice?.Dry}</TableCell>
                  <TableCell>{rate.basePrice?.Reefer}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
        />
      </>
    )}
  </Paper>
</Box>

  );
};

export default FreightRate;

