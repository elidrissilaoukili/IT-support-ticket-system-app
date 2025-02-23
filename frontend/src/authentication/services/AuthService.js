// services/AuthService.js
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/auth`;

const register = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/register`, data, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('An error occurred while registering.');
    }
};

const login = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/login`, data, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('An error occurred while logging in.');
    }
};


const getUserRole = async () => {
    const response = await fetch(`${API_URL}/role`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    if (!response.ok) throw new Error("Unauthorized");

    return response.json();
};


export default {
    register,
    login,
    getUserRole
};