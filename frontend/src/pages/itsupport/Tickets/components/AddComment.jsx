import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { addComment } from '@/services/commentService';  // Make sure you have this service function

const AddComment = ({ ticketId, setIsCommenting }) => {
    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const data = {
            ticketId: ticketId,
            comment: comment
        };

        try {
            await addComment(data);
            toast.success('Comment added successfully!');
            setIsCommenting(false);
        } catch (error) {
            toast.error(error.message || 'Failed to add comment.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">Comments of {ticketId}</h2>
            {}

            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">Add Comment to Ticket {ticketId}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-600">Comment</label>
                    <textarea
                        id="comment"
                        name="comment"
                        value={comment}
                        onChange={handleChange}
                        rows="4"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.comment && <p className="text-red-500 text-sm mt-1">{errors.comment}</p>}
                </div>

                <div className="mt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-2 px-4 font-semibold text-white rounded-md ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'}`}
                    >
                        {isSubmitting ? 'Submitting...' : 'Add Comment'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddComment;
