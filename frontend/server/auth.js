import api from './api';
import { saveToken } from '../utils/tokenStorage';

export const login = async (username, password) => {
  const res = await api.post('/token/', { username, password });
  const { access, refresh } = res.data;
  await saveToken('access_token', access);
  await saveToken('refresh_token', refresh);
};

export const register = async (userData) => {
  const res = await axios.post(`${BASE_URL}/register/`, userData, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  return res.data;
};
