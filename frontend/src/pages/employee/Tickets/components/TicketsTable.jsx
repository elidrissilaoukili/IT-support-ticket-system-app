import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';
import EditTicket from './EditTicket';
import AddComment from './AddComment';
import Details from './Details';

const TicketsTable = ({ tickets, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [isDetailsOpened, setIsDetailsOpened] = useState(false);

  const handleEditClick = (id) => {
    setSelectedId(id);
    setIsEditing(true);
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };


  const handleConfirmDelete = () => {
    onDelete(selectedId);
    setIsModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsEditing(false);
    setSelectedId(null);
  };

  const handleAddComment = (id) => {
    setSelectedId(id);
    setIsCommenting(true);
  };

  const handleCloseAddComment = () => {
    setIsCommenting(false);
    setSelectedId(null);
  };

  const handleOpenDetails = (id) => {
    setSelectedId(id);
    setIsDetailsOpened(true);
  };

  const handleCloseCloseDetails = () => {
    setIsDetailsOpened(false);
    setSelectedId(null);
  };


  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Priority</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">{ticket.id}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">{ticket.title}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">{ticket.priority}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">{ticket.category}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                <button
                  onClick={() => handleEditClick(ticket.id)}
                  className="text-indigo-600 hover:text-indigo-900">Edit</button>
                <button
                  className="ml-4 text-red-600 hover:text-red-900"
                  onClick={() => handleDeleteClick(ticket.id)}
                >
                  Delete
                </button>
                <button
                  className="ml-4 text-green-600 hover:text-green-900"
                  onClick={() => handleAddComment(ticket.id)}
                >
                  Comment
                </button>
                <button
                  className="ml-4 text-orange-600 hover:text-orange-900"
                  onClick={() => handleOpenDetails(ticket.id)}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      {/* Edit Ticket Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
            <button
              onClick={handleCloseEditModal}
              className="mt-4 bg-red-500 font-semibold text-white px-2 cursor-pointer border-r-50">
              X
            </button>

            <EditTicket ticketId={selectedId} setIsEditing={setIsEditing} />
          </div>
        </div>
      )}

      {isCommenting && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
            <button
              onClick={handleCloseAddComment}
              className="mt-4 bg-red-500 font-semibold text-white px-2 cursor-pointer border-r-50">
              X
            </button>

            <AddComment ticketId={selectedId} setIsCommenting={setIsCommenting} />
          </div>
        </div>
      )}



      {isDetailsOpened && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
            <button
              onClick={handleCloseCloseDetails}
              className="mt-4 bg-red-500 font-semibold text-white px-2 cursor-pointer border-r-50">
              X
            </button>

            <Details ticketId={selectedId} setIsDetailsOpened={setIsDetailsOpened} />
          </div>
        </div>
      )}
    </div>


  );
};

export default TicketsTable;
