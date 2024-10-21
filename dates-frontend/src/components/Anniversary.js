import React, { useState, useEffect } from 'react';
import { getAnniversaries, createAnniversary, updateAnniversary, deleteAnniversary } from '../services/api';

const Anniversary = () => {
  const [anniversaries, setAnniversaries] = useState([]);
  const [newAnniversary, setNewAnniversary] = useState({ name: '', anniversary_date: '' });
  const [editAnniversary, setEditAnniversary] = useState(null);

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
    setEditAnniversary(null);
    loadAnniversaries();
  };

  const handleDelete = async (id) => {
    await deleteAnniversary(id);
    loadAnniversaries();
  };

  return (
    <div>
      <h1>Anniversaries</h1>
      <input
        type="text"
        placeholder="Name"
        value={newAnniversary.name}
        onChange={(e) => setNewAnniversary({ ...newAnniversary, name: e.target.value })}
      />
      <input
        type="date"
        value={newAnniversary.date}
        onChange={(e) => setNewAnniversary({ ...newAnniversary, anniversary_date: e.target.value })}
      />
      <button onClick={handleCreate}>Add Anniversary</button>

      <ul>
        {anniversaries.map((anniversary) => (
          <li key={anniversary.id}>
            {anniversary.name} - {anniversary.date}
            <button onClick={() => setEditAnniversary(anniversary)}>Edit</button>
            <button onClick={() => handleDelete(anniversary.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {editAnniversary && (
        <div>
          <h2>Edit Anniversary</h2>
          <input
            type="text"
            value={editAnniversary.name}
            onChange={(e) => setEditAnniversary({ ...editAnniversary, name: e.target.value })}
          />
          <input
            type="date"
            value={editAnniversary.date}
            onChange={(e) => setEditAnniversary({ ...editAnniversary, date: e.target.value })}
          />
          <button onClick={handleUpdate}>Update Anniversary</button>
        </div>
      )}
    </div>
  );
};

export default Anniversary;
