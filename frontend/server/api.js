//axios base config
import axios from 'axios';
import { getToken } from '../utils/tokenStorage';

const instance = axios.create({
  baseURL: 'http://localhost:8081/api',
});

// Add token to every request if available
instance.interceptors.request.use(async (config) => {
  const token = await getToken('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
