import axios from "./axios";

export const loginUser = async (data) => {
  const response = await axios.post("/admin/auth/login", data); 
  return response.data;
};



export const forgotPassword = async (data) => {
  const response = await axios.post(
    "/admin/auth/forgot-password",
    data
  );
  return response.data;
};


export const verifyOtp = async (data) => {
  const response = await axios.post(
    "/admin/auth/verify-otp",
    data
  );
  return response.data;
};



export const resetPassword = async (data) => {
  const token = localStorage.getItem("token"); 
  const response = await axios.post("/admin/auth/set-password", data, {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
  return response.data;
};
