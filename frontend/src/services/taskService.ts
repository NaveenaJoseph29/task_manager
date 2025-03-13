import axiosInstance from '../utils/axiosConfig';
import { ENDPOINTS } from '../utils/constants';

export interface TaskData {
  title: string;
  description?: string;
  dueDate?: Date;
  priority?: string;
  completed?: boolean;
}

export const fetchTasks = async () => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.TASKS);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch tasks');
    }
    throw error;
  }
};

export const fetchTaskById = async (taskId: string) => {
  try {
    const response = await axiosInstance.get(`${ENDPOINTS.TASKS}/${taskId}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch task');
    }
    throw error;
  }
};

export const createTask = async (taskData: TaskData) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.TASKS, taskData);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to create task');
    }
    throw error;
  }
};

export const updateTask = async (taskId: string, taskData: Partial<TaskData>) => {
  try {
    const response = await axiosInstance.put(`${ENDPOINTS.TASKS}/${taskId}`, taskData);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to update task');
    }
    throw error;
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    const response = await axiosInstance.delete(`${ENDPOINTS.TASKS}/${taskId}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to delete task');
    }
    throw error;
  }
};