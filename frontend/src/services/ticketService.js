import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/auth/tickets`;

// Fetch all tickets
export const fetchTickets = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch tickets');
  }
};

// Fetch a single ticket by ID
export const fetchTicket = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch ticket');
  }
};

// Create a new ticket
export const postTicket = async (data) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
      },
    });

    if (response?.data?.body?.errors?.email) {
      toast.error(response?.data?.body?.errors?.email);
    } else {
      toast.success(`Ticket created successfully!`);
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

// Update a ticket by ID
export const updateTicket = async (data, id) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
      },
    });

    if (response?.data?.body?.errors?.email) {
      toast.error(response?.data?.body?.errors?.email);
    } else {
      toast.success(`Ticket with ID ${id} updated successfully!`);
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

// Delete a ticket by ID
export const deleteTicket = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    toast.warning(`Ticket with ID ${id} deleted.`);
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete ticket');
  }
};
