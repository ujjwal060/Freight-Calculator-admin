


import axios from "./axios";

export const loginUser = async (data) => {
  const response = await axios.post("/admin/auth/login", data);  // Apna correct login URL lagao
  return response.data;
};



export const forgotPassword = async (data) => {
  const response = await axios.post(
    "/admin/auth/forgot-password", // Update this with your actual API URL
    data
  );
  return response.data;
};


export const verifyOtp = async (data) => {
  const response = await axios.post(
    "/admin/auth/verify-otp", // Update this with your actual API URL
    data
  );
  return response.data;
};



export const resetPassword = async (data) => {
  const token = localStorage.getItem("token"); // token from localStorage
  const response = await axios.post("/admin/auth/set-password", data, {
    headers: {
      Authorization: `Bearer ${token}`, // ✅ Token header me pass
    },
  });
  return response.data;
};
