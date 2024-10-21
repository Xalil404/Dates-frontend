// src/components/Holiday.js
import React, { useState, useEffect } from 'react';
import { getHolidays, createHoliday, updateHoliday, deleteHoliday } from '../services/api';

const Holiday = () => {
  const [holidays, setHolidays] = useState([]);
  const [newHoliday, setNewHoliday] = useState({ name: '', month: '', day: '' });
  const [editHoliday, setEditHoliday] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // State to hold the ID of the holiday to delete

  useEffect(() => {
    loadHolidays();
  }, []);

  const loadHolidays = async () => {
    const response = await getHolidays();
    setHolidays(response.data);
  };

  const handleCreate = async () => {
    await createHoliday(newHoliday);
    setNewHoliday({ name: '', month: '', day: '' });
    loadHolidays();
  };

  const handleUpdate = async () => {
    await updateHoliday(editHoliday.id, editHoliday);
    setShowEditModal(false); // Close the edit modal after update
    loadHolidays();
  };

  const handleDelete = async (id) => {
    await deleteHoliday(id);
    setShowDeleteModal(false); // Close the delete modal
    loadHolidays();
  };

  const openEditModal = (holiday) => {
    setEditHoliday(holiday);
    setShowEditModal(true); // Show the edit modal
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditHoliday(null); // Clear the edit holiday
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true); // Show the delete confirmation modal
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteId(null); // Clear the delete ID
  };

  return (
    <div>
      <div className="container d-flex justify-content-center align-items-center my-5">
        <div className="col-md-4">
          <h2 className="text-center mb-4">Add a Holiday</h2>
          <input
            type="text"
            placeholder="Name"
            value={newHoliday.name}
            onChange={(e) => setNewHoliday({ ...newHoliday, name: e.target.value })}
            className="form-control mb-2"
          />
          <input
            type="number"
            placeholder="Month (1-12)"
            value={newHoliday.month}
            onChange={(e) => setNewHoliday({ ...newHoliday, month: e.target.value })}
            className="form-control mb-2"
          />
          <input
            type="number"
            placeholder="Day (1-31)"
            value={newHoliday.day}
            onChange={(e) => setNewHoliday({ ...newHoliday, day: e.target.value })}
            className="form-control mb-2"
          />
          <button onClick={handleCreate} className="btn btn-primary w-100">Add Holiday</button>
        </div>
      </div>

      {/* Empty State */}
      {holidays.length === 0 ? (
        <div className="text-center">
          <p><strong>No holidays added yet.</strong></p>
          <p>Click the button above to add your first holiday!</p>
          <img
            src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1729520568/Group_27_yp99rq.png"
            alt="No Holidays"
            className="img-fluid mb-3"
            style={{ width: '450px' }} // Optional: Adjust the size of the image
          />
        </div>
      ) : (
        <div className="row">
          {holidays.map((holiday) => (
            <div className="col-md-4 mb-3" key={holiday.id}>
              <div className="card" style={{ backgroundColor: '#F8F7F5' }}>
                <div className="card-body text-center">
                  <h5 className="card-title">{holiday.name}</h5>
                  <p className="card-text">{holiday.month}/{holiday.day}</p>
                  <div className="d-flex justify-content-between">
                    <button onClick={() => openEditModal(holiday)} className="btn btn-warning">Edit</button>
                    <button onClick={() => openDeleteModal(holiday.id)} className="btn btn-danger">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Holiday Modal */}
      {showEditModal && (
        <div className="modal fade show" style={{ display: 'block' }} aria-modal="true" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Holiday</h5>
                <button type="button" className="btn-close" onClick={closeEditModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {editHoliday && (
                  <>
                    <input
                      type="text"
                      value={editHoliday.name}
                      onChange={(e) => setEditHoliday({ ...editHoliday, name: e.target.value })}
                      className="form-control mb-2"
                    />
                    <input
                      type="number"
                      value={editHoliday.month}
                      onChange={(e) => setEditHoliday({ ...editHoliday, month: e.target.value })}
                      className="form-control mb-2"
                    />
                    <input
                      type="number"
                      value={editHoliday.day}
                      onChange={(e) => setEditHoliday({ ...editHoliday, day: e.target.value })}
                      className="form-control mb-2"
                    />
                  </>
                )}
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button type="button" className="btn btn-secondary" onClick={closeEditModal}>Close</button>
                <button type="button" className="btn btn-success" onClick={handleUpdate}>Update Holiday</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Deletion Modal */}
      {showDeleteModal && (
        <div className="modal fade show" style={{ display: 'block' }} aria-modal="true" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button type="button" className="btn-close" onClick={closeDeleteModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this holiday?</p>
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button type="button" className="btn btn-secondary" onClick={closeDeleteModal}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={() => handleDelete(deleteId)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Holiday;
