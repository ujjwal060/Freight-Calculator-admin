import axios from "./axios";


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
