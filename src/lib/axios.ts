// src/lib/axios.ts
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  withCredentials: true, // ✅ Send cookies for auth
});

// 🔁 Global 401 error handler: auto redirect to login
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.localStorage.clear(); // optional cleanup
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;
