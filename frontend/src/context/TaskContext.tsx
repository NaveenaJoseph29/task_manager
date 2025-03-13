import React, { createContext, useState, useContext, useEffect } from 'react';
import * as taskService from '../services/taskService';
import { useAuth } from './AuthContext';

interface Task {
  _id: string;
  title: string;
  description?: string;
  dueDate?: string | Date;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

interface TaskInput {
  title: string;
  description?: string;
  dueDate?: Date;
  priority?: string;
  completed?: boolean;
}

interface TaskContextType {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  description?: string;
  fetchTasks: () => Promise<void>;
  getTaskById: (taskId: string) => Task | undefined;
  addTask: (taskData: TaskInput) => Promise<Task>;
  updateTask: (taskId: string, taskData: Partial<TaskInput>) => Promise<Task>;
  deleteTask: (taskId: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType>({
  tasks: [],
  isLoading: false,
  error: null,
  
  fetchTasks: async () => {},
  getTaskById: () => undefined,
  addTask: async () => ({ _id: '', title: '', priority: 'medium', completed: false, createdAt: new Date(), updatedAt: new Date() }),
  updateTask: async () => ({ _id: '', title: '', priority: 'medium', completed: false, createdAt: new Date(), updatedAt: new Date() }),
  deleteTask: async () => {},
});

export const useTasks = () => useContext(TaskContext);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  const fetchTasks = async () => {
    if (!isAuthenticated) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const fetchedTasks = await taskService.fetchTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    } else {
      setTasks([]);
    }
  }, [isAuthenticated]);

  const getTaskById = (taskId: string) => {
    return tasks.find(task => task._id === taskId);
  };

  const addTask = async (taskData: TaskInput) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks(prevTasks => [...prevTasks, newTask]);
      return newTask;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add task');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = async (taskId: string, taskData: Partial<TaskInput>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedTask = await taskService.updateTask(taskId, taskData);
      
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task._id === taskId ? updatedTask : task
        )
      );
      
      return updatedTask;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (taskId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await taskService.deleteTask(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        isLoading,
        error,
        fetchTasks,
        getTaskById,
        addTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};