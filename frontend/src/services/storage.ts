import * as SecureStore from 'expo-secure-store';
import { STORAGE_KEYS } from '../utils/constants';

export const storeAuthData = async (token: string, userData: any) => {
  try {
    if (!token || typeof token !== 'string') {
      throw new Error('Invalid token: must be a non-empty string');
    }
    const safeUserData = JSON.stringify(userData ?? {});
    await SecureStore.setItemAsync(STORAGE_KEYS.AUTH_TOKEN, token);
    await SecureStore.setItemAsync(STORAGE_KEYS.USER_DATA, safeUserData);    
    console.log('Token stored successfully:', token);
    return true;
  } catch (error) {
    console.error('Error storing auth data:', error);
    return false;
  }
};

export const getAuthToken = async () => {
  try {
    const token = await SecureStore.getItemAsync(STORAGE_KEYS.AUTH_TOKEN);
    console.log('Retrieved token:', token);
    return token;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

export const getUserData = async () => {
  try {
    const userData = await SecureStore.getItemAsync(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

export const clearAuthData = async () => {
  try {
    await SecureStore.deleteItemAsync(STORAGE_KEYS.AUTH_TOKEN);
    await SecureStore.deleteItemAsync(STORAGE_KEYS.USER_DATA);
    console.log('Auth data cleared'); 
    return true;
  } catch (error) {
    console.error('Error clearing auth data:', error);
    return false;
  }
};
