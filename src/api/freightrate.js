// src/services/freightrate.js
import axios from "./axios"; // your custom axios instance

// ✅ Get Freight Rates
export const getFreightRates = async (payload) => {
  const token = localStorage.getItem("token");
  const response = await axios.post("/admin/freight/list", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// ✅ Add Freight Rate
export const addFreightRate = async (data) => {
  const token = localStorage.getItem("token");
  const response = await axios.post("/admin/freight/add", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
