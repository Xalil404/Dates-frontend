// src/services/api.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/'; // Change this to your deployed backend URL when ready

export const getBirthdays = () => axios.get(`${API_URL}birthdays/`);
export const getAnniversaries = () => axios.get(`${API_URL}anniversaries/`);
export const getHolidays = () => axios.get(`${API_URL}holidays/`);

export const createBirthday = (data) => axios.post(`${API_URL}birthdays/`, data);
export const createAnniversary = (data) => axios.post(`${API_URL}anniversaries/`, data);
export const createHoliday = (data) => axios.post(`${API_URL}holidays/`, data);

export const updateBirthday = (id, data) => axios.put(`${API_URL}birthdays/${id}/`, data);
export const updateAnniversary = (id, data) => axios.put(`${API_URL}anniversaries/${id}/`, data);
export const updateHoliday = (id, data) => axios.put(`${API_URL}holidays/${id}/`, data);

export const deleteBirthday = (id) => axios.delete(`${API_URL}birthdays/${id}/`);
export const deleteAnniversary = (id) => axios.delete(`${API_URL}anniversaries/${id}/`);
export const deleteHoliday = (id) => axios.delete(`${API_URL}holidays/${id}/`);
