import React, { createContext, useState, useContext, useEffect } from 'react';
import * as authService from '../services/authService';
import { getUserData, getAuthToken, storeAuthData, clearAuthData } from '../services/storage';
import axiosInstance from '../utils/axiosConfig';

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: (router: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      setIsLoading(true);
      try {
        const token = await getAuthToken();
        const userData = await getUserData();
        
        console.log('Token on launch:', token);
        console.log('User Data on launch:', userData);
  
        if (token && userData) {
          axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
          setUser(userData);
        }
      } catch (err) {
        console.error('Error loading user data:', err);
      } finally {
        setIsLoading(false);
      }
    };
  
    loadUserData();
  }, []);
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { token, user } = await authService.login({ email, password });

      console.log('Login successful:', token, user);
      await storeAuthData(token, user);
      axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
      
      setUser(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { token, user } = await authService.signup({ name, email, password });

      console.log('Signup successful:', token, user);
      await storeAuthData(token, user);
      axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;

      setUser(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  const logout = async (router: any) => {  
    setIsLoading(true);
    setError(null);
    try {
      await clearAuthData();
      axiosInstance.defaults.headers.Authorization = '';
      setUser(null);
      console.log('User logged out, navigating to login screen...');  
      router.replace('/auth/login'); 
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
