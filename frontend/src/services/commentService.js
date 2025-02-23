import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/auth/comments`;

export const addComment = async (data) => {
    try {
        const response = await axios.post(API_URL, data,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to add comment');
    }
};
