import React, { useState, useEffect } from 'react';
import { fetchTicket } from '@/services/ticketService';
import { toast } from 'react-toastify';

const Details = ({ ticketId }) => {
    const [ticket, setTicket] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTicket = async () => {
            try {
                const data = await fetchTicket(ticketId);
                setTicket(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch ticket details.');
                toast.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        loadTicket();
    }, [ticketId]);

    if (isLoading) {
        return <p className="text-center text-lg text-gray-600">Loading ticket details...</p>;
    }

    if (error) {
        return <p className="text-center text-lg text-red-600">{error}</p>;
    }

    return (
        <div className="max-w-lg mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">Details of Ticket #{ticket.id}</h2>

            <div className="mb-4">
                <p className="text-sm text-gray-600">Title: {ticket.title}</p>
                <p className="text-sm text-gray-600">Description: {ticket.description}</p>
                <p className="text-sm text-gray-600">Priority: {ticket.priority}</p>
                <p className="text-sm text-gray-600">Status: {ticket.status}</p>
                <p className="text-sm text-gray-600">Category: {ticket.category}</p>
            </div>

            <div className="bg-gray-100 p-4 rounded-md">
                <h3 className="text-xl font-semibold mb-4">Comments</h3>
                <div className="max-h-60 overflow-y-scroll">
                    {ticket.comments && ticket.comments.length > 0 ? (
                        ticket.comments.map((comment) => (
                            <div key={comment.id} className="border-b mb-2 pb-2">
                                <p className="text-sm text-gray-700">{comment.comment}</p>
                                <p className="text-xs text-gray-500">Posted on: {new Date(comment.createdAt).toLocaleString()}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500">No comments yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Details;
