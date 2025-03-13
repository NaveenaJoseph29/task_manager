export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.0.6:5000/api';

export const ENDPOINTS = {
  LOGIN: '/auth/login',
  SIGNUP: '/auth/register',
  TASKS: '/tasks',
  USER_PROFILE: '/users/profile',
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_ID: 'user_id',
  USER_DATA: 'user_data',
};

export const PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
};