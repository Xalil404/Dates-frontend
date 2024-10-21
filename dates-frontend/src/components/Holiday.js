import React, { useState, useEffect } from 'react';
import { getHolidays, createHoliday, updateHoliday, deleteHoliday } from '../services/api';

const Holiday = () => {
  const [holidays, setHolidays] = useState([]);
  const [newHoliday, setNewHoliday] = useState({ name: '', month: '', day: '' });
  const [editHoliday, setEditHoliday] = useState(null);

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
    setEditHoliday(null);
    loadHolidays();
  };

  const handleDelete = async (id) => {
    await deleteHoliday(id);
    loadHolidays();
  };

  return (
    <div>
      <h1>Holidays</h1>
      <input
        type="text"
        placeholder="Name"
        value={newHoliday.name}
        onChange={(e) => setNewHoliday({ ...newHoliday, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Month (1-12)"
        value={newHoliday.month}
        onChange={(e) => setNewHoliday({ ...newHoliday, month: e.target.value })}
      />
      <input
        type="number"
        placeholder="Day (1-31)"
        value={newHoliday.day}
        onChange={(e) => setNewHoliday({ ...newHoliday, day: e.target.value })}
      />
      <button onClick={handleCreate}>Add Holiday</button>

      <ul>
        {holidays.map((holiday) => (
          <li key={holiday.id}>
            {holiday.name} - {holiday.date}
            <button onClick={() => setEditHoliday(holiday)}>Edit</button>
            <button onClick={() => handleDelete(holiday.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {editHoliday && (
        <div>
          <h2>Edit Holiday</h2>
          <input
            type="text"
            value={editHoliday.name}
            onChange={(e) => setEditHoliday({ ...editHoliday, name: e.target.value })}
          />
          <input
            type="date"
            value={editHoliday.date}
            onChange={(e) => setEditHoliday({ ...editHoliday, date: e.target.value })}
          />
          <button onClick={handleUpdate}>Update Holiday</button>
        </div>
      )}
    </div>
  );
};

export default Holiday;
