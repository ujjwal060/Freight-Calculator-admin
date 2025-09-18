import React from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  TextField, FormControl, InputLabel, Select, MenuItem
} from "@mui/material";

const AddFreightDialog = ({ open, handleClose, handleAdd, formData, handleChange }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
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
        <Button onClick={handleClose} color="secondary">Cancel</Button>
        <Button onClick={handleAdd} sx={{ background: "#ff6b35", color: "#fff" }}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFreightDialog;
