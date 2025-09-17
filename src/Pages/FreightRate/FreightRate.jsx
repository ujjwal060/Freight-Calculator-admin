



import React, { useEffect, useState } from "react";
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TablePagination, CircularProgress, Select, MenuItem, FormControl, InputLabel, Typography
} from "@mui/material";

import { getFreightRates , addFreightRate } from "../../api/freightrate";
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

  // ✅ Fetch Freight Rates
  const fetchFreightRates = async () => {
    try {
      setLoading(true);
      const payload = { limit: 10, offset: page * rowsPerPage };
      const res = await getFreightRates(payload);
      setFreightRates(res.data || []);
      setTotalCount(res.totalCount || 0);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching freight rates:", err);
      setLoading(false);
    }
  };

  // ✅ Add Freight Rate
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

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, color: "#ff6b35", fontWeight: "bold" }}>
        Freight Rate Management
      </Typography>
      <Button variant="contained" sx={{ background: "#ff6b35", mb: 2 }} onClick={() => setOpen(true)}>
        Add Freight Rate
      </Button>

      {/* Add Freight Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Freight Rate</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel>Container Size</InputLabel>
            <Select name="containerSize" value={formData.containerSize} onChange={handleChange}>
              <MenuItem value="20ft">20ft</MenuItem>
              <MenuItem value="20ft HQ">20ft HQ</MenuItem>
              <MenuItem value="40ft HQ">40ft HQ</MenuItem>
            </Select>
          </FormControl>
          <TextField name="departureCountry" label="Departure Country" fullWidth margin="dense" value={formData.departureCountry} onChange={handleChange} />
          <TextField name="departurePort" label="Departure Port" fullWidth margin="dense" value={formData.departurePort} onChange={handleChange} />
          <TextField name="arrivalCountry" label="Arrival Country" fullWidth margin="dense" value={formData.arrivalCountry} onChange={handleChange} />
          <TextField name="arrivalPort" label="Arrival Port" fullWidth margin="dense" value={formData.arrivalPort} onChange={handleChange} />
          <TextField name="basePriceDry" label="Base Price Dry" type="number" fullWidth margin="dense" value={formData.basePriceDry} onChange={handleChange} />
          <TextField name="basePriceReefer" label="Base Price Reefer" type="number" fullWidth margin="dense" value={formData.basePriceReefer} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleAddFreight} sx={{ background: "#ff6b35", color: "#fff" }}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* Table */}
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
                  {freightRates.slice(0, rowsPerPage).map((rate) => (
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
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>
    </Box>
  );
};

export default FreightRate;
