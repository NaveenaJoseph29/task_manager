import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_BASE_URL, STORAGE_KEYS } from './constants';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
let authToken: string | null = null;
const loadAuthToken = async () => {
  authToken = await SecureStore.getItemAsync(STORAGE_KEYS.AUTH_TOKEN);
  if (authToken) {
    axiosInstance.defaults.headers.Authorization = `Bearer ${authToken}`;
  }
};
loadAuthToken();
export const setAuthToken = async (token: string | null) => {
  authToken = token;
  if (token) {
    axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
    await SecureStore.setItemAsync(STORAGE_KEYS.AUTH_TOKEN, token);
  } else {
    delete axiosInstance.defaults.headers.Authorization;
    await SecureStore.deleteItemAsync(STORAGE_KEYS.AUTH_TOKEN);
  }
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await setAuthToken(null); 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
