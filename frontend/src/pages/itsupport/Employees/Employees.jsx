import React, { useState, useEffect } from 'react';
import ItSupportDashboardLayout from '@/layouts/ItSupportDashboardLayout';
import EmployeeTable from './components/EmployeeTable';
import { fetchEmployees, postEmployee, deleteEmployee } from '@/services/employeeService';
import { toast } from 'react-toastify';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});
    const [search, setSearch] = useState(""); // State for search input
    const [data, setData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    useEffect(() => {
        const loadEmployees = async () => {
            try {
                setLoading(true);
                const fetchedEmployees = await fetchEmployees();
                setEmployees(fetchedEmployees);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadEmployees();
    }, []);

    // Filter employees based on search input
    const filteredEmployees = employees.filter(emp =>
        emp.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleToggleModal = () => {
        setOpenModal(!openModal);
        setErrors({});
    };

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        let validationErrors = {};
        if (!data.email) validationErrors.email = 'Email is required.';
        if (!data.password) validationErrors.password = 'Password is required.';
        if (data.password !== data.confirmPassword)
            validationErrors.confirmPassword = 'Passwords do not match.';
        return validationErrors;
    };

    const addEmployee = async (e) => {
        e.preventDefault();
        setErrors({});
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setProcessing(true);
            await postEmployee(data);

            setData({ email: '', password: '', confirmPassword: '' });

            const fetchedEmployees = await fetchEmployees();
            setEmployees(fetchedEmployees);
            setOpenModal(false);
        } catch (error) {
            if (error.response && error.response.data) {
                const { success, errors, message } = error.response.data;

                if (!success && errors) {
                    if (errors.email) {
                        setErrors({ api: errors.email });
                        toast.error(errors.email);
                    } else {
                        setErrors({ api: message || 'Something went wrong' });
                        toast.error(message || 'An error occurred.');
                    }
                } else {
                    setErrors({ api: message || 'An unknown error occurred' });
                    toast.error(message || 'An unknown error occurred');
                }
            } else {
                setErrors({ api: 'An unknown error occurred, please try again later.' });
                toast.error('An unknown error occurred, please try again later.');
            }
        } finally {
            setProcessing(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteEmployee(id);
            const fetchedEmployees = await fetchEmployees();
            setEmployees(fetchedEmployees);
            toast.warning(`employee ${id} deleted`);
        } catch (error) {
            setError("Failed to delete employee.");
        }
    };

    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <ItSupportDashboardLayout>
            <h1 className="text-3xl text-center p-4 font-semibold">Manage Employees</h1>

            <div className="text-center mb-6">
                <button
                    onClick={handleToggleModal}
                    className="px-4 py-2 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition duration-200"
                >
                    Add Employee
                </button>
            </div>

            {/* Modal */}
            {openModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                        <h2 className="text-2xl font-semibold text-center mb-4">Add Employee</h2>

                        {errors.api && <p className="text-red-500 text-center">{errors.api}</p>}

                        <form onSubmit={addEmployee} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                    autoComplete="email"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                    autoComplete="new-password"
                                />
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    name="confirmPassword"
                                    value={data.confirmPassword}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                    autoComplete="new-password"
                                />
                                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                            </div>

                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition duration-200 disabled:opacity-50"
                                disabled={processing}
                            >
                                {processing ? 'Registering...' : 'Create Employee'}
                            </button>
                        </form>

                        <button
                            onClick={handleToggleModal}
                            className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Employee Table */}
            {/* Search Input */}
            <div className="container mx-auto p-4">
                <input
                    type="text"
                    placeholder="Search by email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="mb-4 px-4 py-2 border border-gray-300 rounded-lg w-full max-w-md focus:ring-teal-500 focus:border-teal-500"
                />

                <h2 className="text-2xl font-bold mb-4">Employees</h2>
                {loading ? <p>Loading...</p> : <EmployeeTable employees={filteredEmployees} onDelete={handleDelete} />}
            </div>
        </ItSupportDashboardLayout>
    );
};

export default Employees;
