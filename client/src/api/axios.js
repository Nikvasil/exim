import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_PROD_BASE_URL || 'http://localhost:5000',
});

export default api;
