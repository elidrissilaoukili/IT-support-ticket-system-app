import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ element: Element }) => {
    const token = localStorage.getItem('token');

    return (
        <>
            {token ? <Navigate to="/profile" /> : <Element />}
        </>
    );
};

export default PublicRoute;
