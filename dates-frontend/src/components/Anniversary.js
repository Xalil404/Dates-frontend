// src/components/Anniversary.js
import React, { useState, useEffect } from 'react';
import { getAnniversaries, createAnniversary, updateAnniversary, deleteAnniversary } from '../services/api';

const Anniversary = () => {
  const [anniversaries, setAnniversaries] = useState([]);
  const [newAnniversary, setNewAnniversary] = useState({ name: '', anniversary_date: '' });
  const [editAnniversary, setEditAnniversary] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // State to hold the ID of the anniversary to delete

  useEffect(() => {
    loadAnniversaries();
  }, []);

  const loadAnniversaries = async () => {
    const response = await getAnniversaries();
    setAnniversaries(response.data);
  };

  const handleCreate = async () => {
    await createAnniversary(newAnniversary);
    setNewAnniversary({ name: '', anniversary_date: '' });
    loadAnniversaries();
  };

  const handleUpdate = async () => {
    await updateAnniversary(editAnniversary.id, editAnniversary);
    setShowEditModal(false); // Close the edit modal after update
    loadAnniversaries();
  };

  const handleDelete = async (id) => {
    await deleteAnniversary(id);
    setShowDeleteModal(false); // Close the delete modal
    loadAnniversaries();
  };

  const openEditModal = (anniversary) => {
    setEditAnniversary(anniversary);
    setShowEditModal(true); // Show the edit modal
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditAnniversary(null); // Clear the edit anniversary
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
          <h2 className="text-center mb-4">Add an Anniversary</h2>
          <input
            type="text"
            placeholder="Name"
            value={newAnniversary.name}
            onChange={(e) => setNewAnniversary({ ...newAnniversary, name: e.target.value })}
            className="form-control mb-2"
          />
          <input
            type="date"
            value={newAnniversary.anniversary_date}
            onChange={(e) => setNewAnniversary({ ...newAnniversary, anniversary_date: e.target.value })}
            className="form-control mb-2"
          />
          <button onClick={handleCreate} className="btn btn-primary w-100">Add Anniversary</button>
        </div>
      </div>
      {/* Empty State */}
      {anniversaries.length === 0 ? (
        <div className="text-center">
          <p><strong>No anniversaries added yet.</strong></p>
          <p>Click the button above to add your first anniversary!</p>
          <img
            src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1729520568/Group_27_yp99rq.png"
            alt="No Anniversaries"
            className="img-fluid mb-3"
            style={{ width: '450px' }} // Optional: Adjust the size of the image
          />
        </div>
      ) : (
        <div className="row">
          {anniversaries.map((anniversary) => (
            <div className="col-md-4 mb-3" key={anniversary.id}>
              <div className="card" style={{ backgroundColor: '#F8F7F5' }}>
                <div className="card-body text-center">
                  <h5 className="card-title">{anniversary.name}</h5>
                  <p className="card-text">{anniversary.anniversary_date}</p>
                  <div className="d-flex justify-content-between">
                    <button onClick={() => openEditModal(anniversary)} className="btn btn-warning">Edit</button>
                    <button onClick={() => openDeleteModal(anniversary.id)} className="btn btn-danger">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Anniversary Modal */}
      {showEditModal && (
        <div className="modal fade show" style={{ display: 'block' }} aria-modal="true" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Anniversary</h5>
                <button type="button" className="btn-close" onClick={closeEditModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {editAnniversary && (
                  <>
                    <input
                      type="text"
                      value={editAnniversary.name}
                      onChange={(e) => setEditAnniversary({ ...editAnniversary, name: e.target.value })}
                      className="form-control mb-2"
                    />
                    <input
                      type="date"
                      value={editAnniversary.anniversary_date}
                      onChange={(e) => setEditAnniversary({ ...editAnniversary, anniversary_date: e.target.value })}
                      className="form-control mb-2"
                    />
                  </>
                )}
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button type="button" className="btn btn-secondary" onClick={closeEditModal}>Close</button>
                <button type="button" className="btn btn-success" onClick={handleUpdate}>Update Anniversary</button>
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
                <p>Are you sure you want to delete this anniversary?</p>
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

export default Anniversary;
