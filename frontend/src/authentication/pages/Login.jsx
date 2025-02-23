import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GuestLayout from '../../Layouts/GuestLayout';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const { responseData, login, errors, success, message, processing } = useAuth();

    const [data, setData] = useState({
        email: '',
        password: '',
        remember: false,
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(data);
    };

    return (
        <GuestLayout>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-center text-gray-700">Sign In</h2>
                    <form onSubmit={handleSubmit} className="mt-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                autoComplete="username"
                                onChange={handleChange}
                            />
                            {/* {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>} */}
                        </div>

                        <div className="mt-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                autoComplete="current-password"
                                onChange={handleChange}
                            />
                            {/* {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>} */}
                            <p className="text-red-500 text-sm mt-1">{success ? "" : message}</p>
                            {/* Success or Error Message */}
                            {success && <p className="text-green-500 mt-4">{message}</p>}
                            {errors && Object.keys(errors).length > 0 && (
                                <div className="mt-4 text-red-500">
                                    {Object.values(errors).map((error, index) => (
                                        <p key={index}>{error}</p>
                                    ))}
                                </div>
                            )}
                        </div>


                        <div className="mt-4 flex items-center justify-between">
                            <Link
                                to="/register"
                                className="text-sm text-indigo-600 hover:underline"
                            >
                                Create an account for free
                            </Link>
                        </div>

                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                                disabled={processing}
                            >
                                {processing ? 'Logging in...' : 'Log in'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
};

export default Login;