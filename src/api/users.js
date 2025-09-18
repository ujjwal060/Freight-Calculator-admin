import axios from "./axios";

// const API_URL = "http://15.134.44.62:8888/api"; // Base URL

export const getUsers = async (payload) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `/admin/user/get-all-users`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
