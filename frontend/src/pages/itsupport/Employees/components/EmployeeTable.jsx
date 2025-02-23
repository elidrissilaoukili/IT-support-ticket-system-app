// components/EmployeeTable.js
import { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

const EmployeeTable = ({ employees, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(selectedId);
    setIsModalOpen(false);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">{employee.id}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">{employee.email}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">{employee.role}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                {/* <button className="text-indigo-600 hover:text-indigo-900">Edit</button> */}
                <button
                  className="ml-4 text-red-600 hover:text-red-900"
                  onClick={() => handleDeleteClick(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default EmployeeTable;