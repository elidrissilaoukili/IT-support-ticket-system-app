import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [processing, setProcessing] = useState(false);

    const register = async (data) => {
        setProcessing(true);
        try {
            const response = await AuthService.register(data);
            setUser(response.user);
            setSuccess(true);
            setMessage(response.message);
            navigate('/login');
            setErrors({});
        } catch (error) {
            setErrors(error.errors || {});
        }
        setProcessing(false);
    };


    const login = async (data) => {
        try {
            const response = await AuthService.login(data);
            if (response.success) {
                localStorage.setItem("token", response.token);
                localStorage.setItem("role", response.role);

                // ✅ Update user state
                setUser({ role: response.role });

                // ✅ Navigate after updating state
                if (response.role === 'ROLE_ITSUPPORT') {
                    navigate('/it-support');
                } else if (response.role === 'ROLE_EMPLOYEE') {
                    navigate('/employee');
                } else {
                    navigate('/pagenotfound');
                }
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrors(error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, errors, processing, success, message, register, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);