import axiosInstance, { setAuthToken } from '../utils/axiosConfig';
import { ENDPOINTS } from '../utils/constants';
import { storeAuthData, clearAuthData } from './storage';

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
}

export const login = async (credentials: LoginCredentials) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.LOGIN, credentials);
    
    if (response.data.token && response.data.user) {
      await storeAuthData(response.data.token, response.data.user);
      await setAuthToken(response.data.token);
      
      return { token: response.data.token, user: response.data.user };
    }

    throw new Error('Invalid response from server');
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};


export const signup = async (userData: SignupData) => {
  try {
    console.log('Signing up with:', userData); 
    const response = await axiosInstance.post(ENDPOINTS.SIGNUP, userData);
    console.log('Signup response:', response.data); 

if (response.data.token && response.data.user) {
  await storeAuthData(response.data.token, response.data.user);
  await setAuthToken(response.data.token);
  return { token: response.data.token, user: response.data.user }; 
}
    throw new Error('Invalid response from server');
  } catch (error: any) {
    console.error('Signup error:', error.response?.data || error.message); 
    if (error.response) {
      throw new Error(error.response.data.message || 'Signup failed');
    }
    throw error;
  }
};


export const logout = async () => {
  try {
    await clearAuthData();
    await setAuthToken(null); 
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.USER_PROFILE);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to get user profile');
  }
};
