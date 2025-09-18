



import React from "react";
import {
  Drawer, Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button
} from "@mui/material";

const AddFreightDialog = ({ open, handleClose, handleAdd, formData, handleChange }) => {
  return (
    <Drawer
      anchor="right" // right side se open hoga
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: { width: 400, p: 2 } // width aur padding set karne ke liye
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, color: "#ff6b35", fontWeight: "bold" }}>
        Add Freight Rate
      </Typography>

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

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button onClick={handleClose} color="secondary" sx={{ mr: 1 }}>Cancel</Button>
        <Button onClick={handleAdd} sx={{ background: "#ff6b35", color: "#fff" }}>Add</Button>
      </Box>
    </Drawer>
  );
};

export default AddFreightDialog;
