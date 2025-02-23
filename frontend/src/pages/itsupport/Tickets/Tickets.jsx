import React, { useState, useEffect } from 'react';
import ItSupportDashboardLayout from '@/layouts/ItSupportDashboardLayout';
import TicketsTable from './components/TicketsTable';
import { toast } from 'react-toastify';
import { fetchTickets, postTicket, deleteTicket } from '@/services/ticketService';

const Tickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});
    const [search, setSearch] = useState('');
    const [data, setData] = useState({
        title: '',
        description: '',
        priority: '',
        category: '',
        status: '',
    });

  
    useEffect(() => {
        const loadTickets = async () => {
            try {
                setLoading(true);
                const fetchedTickets = await fetchTickets();
                setTickets(fetchedTickets);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadTickets();
    }, []);



    const filteredTickets = tickets.filter((ticket) =>
        ticket.title.toLowerCase().includes(search.toLowerCase())
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
        if (!data.title) validationErrors.title = 'Title is required.';
        if (!data.description) validationErrors.description = 'Description is required.';
        if (!data.priority) validationErrors.priority = 'Priority is required.';
        if (!data.category) validationErrors.category = 'Category is required.';
        return validationErrors;
    };

    const addTicket = async (e) => {
        e.preventDefault();
        setErrors({});
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setProcessing(true);
            await postTicket(data);
            setData({
                title: '',
                description: '',
                priority: '',
                category: '',
                status: '',
            });

            // Fetch updated tickets
            const fetchedTickets = await fetchTickets();
            setTickets(fetchedTickets);
            setOpenModal(false);
        } catch (error) {
            toast.error(error.response?.data?.message || 'An unknown error occurred');
            setErrors({ api: error.response?.data?.message || 'An unknown error occurred' });
        } finally {
            setProcessing(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTicket(id);
            const fetchedTickets = await fetchTickets();
            setTickets(fetchedTickets);
        } catch (error) {
            setError('Failed to delete ticket.');
        }
    };

    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <ItSupportDashboardLayout>
            <h1 className="text-3xl text-center p-4 font-semibold">Manage Tickets</h1>

            <div className="text-center mb-6">
                <button
                    onClick={handleToggleModal}
                    className="px-4 py-2 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition duration-200"
                >
                    Create Ticket
                </button>
            </div>

            {/* Modal */}
            {openModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                        <h2 className="text-2xl font-semibold text-center mb-4">Create Ticket</h2>

                        {errors.api && <p className="text-red-500 text-center">{errors.api}</p>}

                        <form onSubmit={addTicket} className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    Title
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    name="title"
                                    value={data.title}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                />
                                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <input
                                    id="description"
                                    type="text"
                                    name="description"
                                    value={data.description}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                />
                                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                            </div>

                            <div>
                                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                                    Priority
                                </label>
                                <select
                                    name="priority"
                                    id="priority"
                                    value={data.priority}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                >
                                    <option value="LOW">LOW</option>
                                    <option value="MEDIUM">MEDIUM</option>
                                    <option value="HIGH">HIGH</option>
                                </select>
                                {errors.priority && <p className="text-red-500 text-sm mt-1">{errors.priority}</p>}
                            </div>

                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                    Category
                                </label>
                                <select
                                    name="category"
                                    id="category"
                                    value={data.category}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                >
                                    <option value="NETWORK">NETWORK</option>
                                    <option value="HARDWARE">HARDWARE</option>
                                    <option value="SOFTWARE">SOFTWARE</option>
                                    <option value="OTHER">OTHER</option>
                                </select>
                                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                            </div>

                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition duration-200 disabled:opacity-50"
                                disabled={processing}
                            >
                                {processing ? 'Creating Ticket...' : 'Create Ticket'}
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

            {/* Ticket Table */}
            <div className="container mx-auto p-4">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="mb-4 px-4 py-2 border border-gray-300 rounded-lg w-full max-w-md focus:ring-teal-500 focus:border-teal-500"
                />

                <h2 className="text-2xl font-bold mb-4">Tickets</h2>
                {loading ? <p>Loading...</p> : <TicketsTable tickets={filteredTickets} onDelete={handleDelete} />}
            </div>
        </ItSupportDashboardLayout>
    );
};

export default Tickets;
