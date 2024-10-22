import React, { useState, useEffect } from 'react';
import { getBirthdays, createBirthday, updateBirthday, deleteBirthday } from '../services/api';

const Birthday = () => {
  const [birthdays, setBirthdays] = useState([]);
  const [newBirthday, setNewBirthday] = useState({ name: '', birthdate: '' });
  const [editBirthday, setEditBirthday] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // State to hold the ID of the birthday to delete

  useEffect(() => {
    loadBirthdays();
  }, []);

  const loadBirthdays = async () => {
    const response = await getBirthdays();
    setBirthdays(response.data);
  };

  const handleCreate = async () => {
    await createBirthday(newBirthday);
    setNewBirthday({ name: '', birthdate: '' });
    loadBirthdays();
  };

  const handleUpdate = async () => {
    await updateBirthday(editBirthday.id, editBirthday);
    setShowEditModal(false); // Close the edit modal after update
    loadBirthdays();
  };

  const handleDelete = async (id) => {
    await deleteBirthday(id);
    setShowDeleteModal(false); // Close the delete modal
    loadBirthdays();
  };

  const openEditModal = (birthday) => {
    setEditBirthday(birthday);
    setShowEditModal(true); // Show the edit modal
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditBirthday(null); // Clear the edit birthday
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
          <h2 className="text-center mb-4">Add a Birthday</h2>
          <input
            type="text"
            placeholder="Name"
            value={newBirthday.name}
            onChange={(e) => setNewBirthday({ ...newBirthday, name: e.target.value })}
            className="form-control mb-2"
          />
          <input
            type="date"
            value={newBirthday.birthdate}
            onChange={(e) => setNewBirthday({ ...newBirthday, birthdate: e.target.value })}
            className="form-control mb-2"
          />
          <button onClick={handleCreate} className="btn btn-primary w-100">Add Birthday</button>
        </div>
      </div>

      {/* Empty State */}
      {birthdays.length === 0 ? (
        <div className="text-center">
          <p><strong>No birthdays added yet.</strong></p>
          <p>Click the button above to add your first birthday!</p>
          <img
            src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1729520568/Group_27_yp99rq.png"
            alt="No Birthdays"
            className="img-fluid mb-3"
            style={{ width: '450px' }} // Optional: Adjust the size of the image
          />
        </div>
      ) : (
        <div className="row">
          {birthdays.map((birthday) => (
            <div className="col-md-4 mb-3" key={birthday.id}>
              <div className="card" style={{ backgroundColor: '#F8F7F5' }}>
                <div className="card-body text-center">
                  <h5 className="card-title">{birthday.name}</h5>
                  <p className="card-text">{birthday.birthdate}</p>
                  <div className="d-flex justify-content-between">
                    <button onClick={() => openEditModal(birthday)} className="btn btn-warning">Edit</button>
                    <button onClick={() => openDeleteModal(birthday.id)} className="btn btn-danger">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Birthday Modal */}
      {showEditModal && (
        <div className="modal fade show" style={{ display: 'block' }} aria-modal="true" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Birthday</h5>
                <button type="button" className="btn-close" onClick={closeEditModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {editBirthday && (
                  <>
                    <input
                      type="text"
                      value={editBirthday.name}
                      onChange={(e) => setEditBirthday({ ...editBirthday, name: e.target.value })}
                      className="form-control mb-2"
                    />
                    <input
                      type="date"
                      value={editBirthday.birthdate}
                      onChange={(e) => setEditBirthday({ ...editBirthday, birthdate: e.target.value })}
                      className="form-control mb-2"
                    />
                  </>
                )}
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button type="button" className="btn btn-secondary" onClick={closeEditModal}>Close</button>
                <button type="button" className="btn btn-success" onClick={handleUpdate}>Update Birthday</button>
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
                <p>Are you sure you want to delete this birthday?</p>
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

export default Birthday;
