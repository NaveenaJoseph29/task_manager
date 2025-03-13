import Task from '../models/Task.js';
import { asyncHandler, errorResponse } from '../utils/errorHandler.js';


export const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(tasks);
});


export const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!task) {
    return errorResponse(res, 404, 'Task not found');
  }

  res.json(task);
});


export const createTask = asyncHandler(async (req, res) => {
  const { title, description, dueDate, priority, completed } = req.body;

  if (!title) {
    return errorResponse(res, 400, 'Title is required');
  }

  const task = await Task.create({
    title,
    description,
    dueDate,
    priority,
    completed: completed || false,
    user: req.user.id,
  });

  res.status(201).json(task);
});


export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

  if (!task) {
    return errorResponse(res, 404, 'Task not found');
  }

  const { title, description, dueDate, priority, completed } = req.body;

  task.title = title || task.title;
  task.description = description || task.description;
  task.dueDate = dueDate || task.dueDate;
  task.priority = priority || task.priority;
  task.completed = completed !== undefined ? completed : task.completed;

  await task.save();

  res.json(task);
});


export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

  if (!task) {
    return errorResponse(res, 404, 'Task not found');
  }

  await task.deleteOne();

  res.json({ message: 'Task deleted successfully' });
});
