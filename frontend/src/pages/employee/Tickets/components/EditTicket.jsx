import React, { useState, useEffect } from 'react';
import { fetchTickets, fetchTicket, updateTicket } from '@/services/ticketService';
import { toast } from 'react-toastify';

const EditTicket = ({ ticketId, setIsEditing }) => {
    const [ticketData, setTicketData] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const loadTicket = async () => {
            try {
                const data = await fetchTicket(ticketId);
                setTicketData(data);
            } catch (error) {
                toast.error(error.message || 'Failed to fetch ticket details.');
            }
        };

        loadTicket();
    }, [ticketId]);

    const handleChange = (e) => {
        setTicketData({
            ...ticketData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await updateTicket(ticketData, ticketId);
            location.reload();
            setIsEditing(false);
        } catch (error) {
            toast.error(error.message || 'Failed to update ticket.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!ticketData) {
        return <p className="text-center text-lg text-gray-600">Loading ticket details...</p>;
    }

    return (
        <div className="max-w-lg mx-auto p-6 ">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">Edit Ticket</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-600">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={ticketData.title}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-600">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={ticketData.description}
                        onChange={handleChange}
                        rows="4"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-600">Priority</label>
                    <select
                        id="priority"
                        name="priority"
                        value={ticketData.priority}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <select
                        name="category"
                        id="category"
                        value={ticketData.category}
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

                <div className="mt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-2 px-4 font-semibold text-white rounded-md ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'}`}
                    >
                        {isSubmitting ? 'Updating...' : 'Update Ticket'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTicket;
