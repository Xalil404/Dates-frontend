// src/services/api.js
import axios from 'axios';

const API_URL = 'https://birthdates-backend-324e87abe531.herokuapp.com/api/'; // Change this to your deployed backend URL when ready

// Fetch all birthdays, anniversaries, and holidays
export const getBirthdays = () => axios.get(`${API_URL}birthdays/`);
export const getAnniversaries = () => axios.get(`${API_URL}anniversaries/`);
export const getHolidays = () => axios.get(`${API_URL}holidays/`);

// Fetch user-specific data
export const getUserBirthdays = (userId) => axios.get(`${API_URL}birthdays/?user=${userId}`);
export const getUserAnniversaries = (userId) => axios.get(`${API_URL}anniversaries/?user=${userId}`);
export const getUserHolidays = (userId) => axios.get(`${API_URL}holidays/?user=${userId}`);

// Create new entries
export const createBirthday = (data) => axios.post(`${API_URL}birthdays/`, data);
export const createAnniversary = (data) => axios.post(`${API_URL}anniversaries/`, data);
export const createHoliday = (data) => axios.post(`${API_URL}holidays/`, data);

// Update existing entries
export const updateBirthday = (id, data) => axios.put(`${API_URL}birthdays/${id}/`, data);
export const updateAnniversary = (id, data) => axios.put(`${API_URL}anniversaries/${id}/`, data);
export const updateHoliday = (id, data) => axios.put(`${API_URL}holidays/${id}/`, data);

// Delete existing entries
export const deleteBirthday = (id) => axios.delete(`${API_URL}birthdays/${id}/`);
export const deleteAnniversary = (id) => axios.delete(`${API_URL}anniversaries/${id}/`);
export const deleteHoliday = (id) => axios.delete(`${API_URL}holidays/${id}/`);
