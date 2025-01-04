import express from 'express';
import { createTask, getTasks, getTaskById, updateTaskStatus, deleteTask } from '../controllers/taskController';

const router = express.Router();

router.post('/tasks', createTask); // Create a new task

router.get('/tasks', getTasks); // Get all tasks

router.get('/tasks/:id', getTaskById); // Get a single task by ID

router.put('/tasks/:id', updateTaskStatus);// Update a task by ID

router.delete('/tasks/:id', deleteTask);// Delete a task by ID

export default router;
