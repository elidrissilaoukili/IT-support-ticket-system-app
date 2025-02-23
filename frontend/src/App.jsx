import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from '@/routes/PrivateRoute';
import PublicRoute from '@/routes/PublicRoute';

import Login from "@/authentication/pages/Login";
import Register from "@/authentication/pages/Register";

import Profile from '@/pages/profile/Profile';


// admin dashboard
import ItSupportDash from "@/pages/itsupport/ItSupportDash";
import Employees from '@/pages/itsupport/Employees/Employees'
import Tickets from '@/pages/itsupport/Tickets/Tickets'



import { AuthProvider } from '@/authentication/context/AuthContext';
import HomePage from "@/pages/home/HomePage";


// for employees
import EmployeeDash from "./pages/employee/EmployeeDash";
import EmpTickets from "./pages/employee/Tickets/EmpTickets";

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <ToastContainer />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<PublicRoute element={Login} />} />
                    <Route path="/register" element={<PublicRoute element={Register} />} />

                    {/* PrivateRoute with role check */}
                    <Route path="/profile" element={<PrivateRoute element={Profile} allowedRoles={['ROLE_ITSUPPORT', 'ROLE_EMPLOYEE']} />} />
                    <Route path="/it-support" element={<PrivateRoute element={ItSupportDash} allowedRoles={['ROLE_ITSUPPORT']} />} />
                    <Route path="/it-support/employees" element={<PrivateRoute element={Employees} allowedRoles={['ROLE_ITSUPPORT']} />} />
                    <Route path="/it-support/tickets" element={<PrivateRoute element={Tickets} allowedRoles={['ROLE_ITSUPPORT']} />} />

                    {/* for employees */}
                    <Route path="/employee" element={<PrivateRoute element={EmployeeDash} allowedRoles={['ROLE_EMPLOYEE']} />} />
                    <Route path="/employee/tickets" element={<PrivateRoute element={EmpTickets} allowedRoles={['ROLE_EMPLOYEE']} />} />

                </Routes>
            </AuthProvider>
        </Router>

    );
};

export default App;
