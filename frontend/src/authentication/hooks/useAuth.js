import { useState, useEffect } from "react";
import axios from "axios";

const useAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/users/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user:", error);
                localStorage.removeItem("token");
            }
        };

        fetchUser();
    }, []);

    return user;
};


export default useAuth;
