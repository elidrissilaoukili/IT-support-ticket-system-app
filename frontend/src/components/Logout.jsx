import React from 'react';
import { useNavigate } from 'react-router-dom';
// import LogoutIcon from "./Icons";
import LogoutIcon from '@mui/icons-material/Logout';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/');
    };

    return (
        <button
            onClick={handleLogout}
            className="px-2 py-1 bg-blue-500 cursor-pointer text-white rounded-md hover:bg-blue-800">
            Log out <LogoutIcon fontSize='small' />
        </button>
    );
};

export default Logout;
