
import axios from "./axios"; // your axios instance with baseURL set

// Fetch freight rates
export const getFreightRates = async (payload) => {
  const token = localStorage.getItem("token");
  const response = await axios.post("/admin/freight/list", payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Add freight rate
export const addFreightRate = async (data) => {
  const token = localStorage.getItem("token");
  const response = await axios.post("/admin/freight/add", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ✅ Update freight rate
export const updateFreightRate = async (id, data) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(`/admin/freight/update/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ✅ Delete freight rate
export const deleteFreightRate = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`/admin/freight/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
