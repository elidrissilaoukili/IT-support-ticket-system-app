import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../authentication/context/AuthContext";
import AuthService from "../authentication/services/AuthService";

const PrivateRoute = ({ element: Element, allowedRoles }) => {
    const { user } = useAuth();
    const [verifiedRole, setVerifiedRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyRole = async () => {
            try {
                const response = await AuthService.getUserRole(); // Call API to get the real role
                setVerifiedRole(response.role);
            } catch (error) {
                setVerifiedRole(null); // If token is invalid, reset role
            }
            setLoading(false);
        };

        verifyRole();
    }, []);

    if (loading) return <div className="min-h-screen flex justify-center">
        <div class="relative flex justify-center items-center">
            <div class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-gray-500"></div>
            <img src={`${import.meta.env.VITE_API_BASE_URL}/images/avatar-thinking.svg`} class="rounded-full h-28 w-28" />
        </div>
    </div>; // Prevent showing the page while verifying

    if (!verifiedRole) return <Navigate to="/login" />;
    if (!allowedRoles.includes(verifiedRole)) return <Navigate to="/profile" />;

    return <Element />;
};

export default PrivateRoute;
