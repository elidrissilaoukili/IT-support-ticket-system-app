import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/auth/users`;

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem("token")}`,
});

export const updateEmail = async (profileData) => {
  const response = await axios.put(`${API_URL}/me`, profileData, { headers: getAuthHeaders() });
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await axios.put(`${API_URL}/me`, profileData, { headers: getAuthHeaders() });
  return response.data;
};

export const updatePassword = async (profileData) => {
  const response = await axios.put(`${API_URL}/password`, profileData, { headers: getAuthHeaders() });
  return response.data;
};

export const deleteUser = async () => {
  const response = await axios.delete(`${API_URL}/destroy`, { headers: getAuthHeaders() });
  return response.data;
};
