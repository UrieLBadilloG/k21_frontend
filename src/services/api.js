import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Endpoints de la API
export const login = (data) => API.post('/login', data);
export const uploadExcel = (formData) => API.post('/upload-excel', formData);
export const getUsers = (page, pageSize) => API.get(`/personas?page=${page}&page_size=${pageSize}`);
export const getUserDetails = (id) => API.get(`/persona/${id}`);
export const createUser = (userData) => API.post('/create-user', userData);

export default API;
