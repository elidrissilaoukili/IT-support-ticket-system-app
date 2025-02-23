import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/auth/employees`;

export const fetchEmployees = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch employees');
  }
};

export const postEmployee = async (data) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
      },
    });

    if (response?.data?.body?.errors?.email) {
      toast.error(response?.data?.body?.errors?.email)
    } else {
      toast.success(`employee ${response?.data?.body?.data?.email} created !`)
      return response.data;
    }
  } catch (error) {
    throw error; 
  }
};

export const deleteEmployee = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete employee');
  }
};
