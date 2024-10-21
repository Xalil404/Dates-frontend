// src/components/Birthday.js
import React, { useState, useEffect } from 'react';
import { getBirthdays, createBirthday, updateBirthday, deleteBirthday } from '../services/api';

const Birthday = () => {
  const [birthdays, setBirthdays] = useState([]);
  const [newBirthday, setNewBirthday] = useState({ name: '', birthdate: '' });
  const [editBirthday, setEditBirthday] = useState(null);

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
    setEditBirthday(null);
    loadBirthdays();
  };

  const handleDelete = async (id) => {
    await deleteBirthday(id);
    loadBirthdays();
  };

  return (
    <div>
      <h1>Birthdays</h1>
      <input
        type="text"
        placeholder="Name"
        value={newBirthday.name}
        onChange={(e) => setNewBirthday({ ...newBirthday, name: e.target.value })}
      />
      <input
        type="date"
        value={newBirthday.birthdate}
        onChange={(e) => setNewBirthday({ ...newBirthday, birthdate: e.target.value })}
      />
      <button onClick={handleCreate}>Add Birthday</button>

      <ul>
        {birthdays.map((birthday) => (
          <li key={birthday.id}>
            {birthday.name} - {birthday.date}
            <button onClick={() => setEditBirthday(birthday)}>Edit</button>
            <button onClick={() => handleDelete(birthday.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {editBirthday && (
        <div>
          <h2>Edit Birthday</h2>
          <input
            type="text"
            value={editBirthday.name}
            onChange={(e) => setEditBirthday({ ...editBirthday, name: e.target.value })}
          />
          <input
            type="date"
            value={editBirthday.date}
            onChange={(e) => setEditBirthday({ ...editBirthday, date: e.target.value })}
          />
          <button onClick={handleUpdate}>Update Birthday</button>
        </div>
      )}
    </div>
  );
};

export default Birthday;
