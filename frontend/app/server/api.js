// axios base config
import axios from 'axios';
import { getToken } from '../../utils/tokenStorage';

const BASE_URL = 'http://192.168.251.30:8000/api/';

// Create an axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await getToken('access_token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log('Unauthorized — token may have expired.');
      // You could log the user out or navigate to Login screen
      // e.g. await removeToken('access_token');
    }
    return Promise.reject(error);
  }
);

export default api;
