import { Request, Response } from 'express';
import * as taskService from '../services/taskServices';
import { ITask } from '../models/taskModel';

// Create a new task
export const createTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description } = req.body;
        const task: ITask = await taskService.createTask({ title, description });
        res.status(201).json({ success: true, data: task });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create task',
            error: error instanceof Error ? error.message : 'An unexpected error occurred',
        });
    }
};

// Fetch all tasks
export const getTasks = async (_req: Request, res: Response): Promise<void> => {
    try {
        const tasks: ITask[] = await taskService.getAllTasks();
        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch tasks',
            error: error instanceof Error ? error.message : 'An unexpected error occurred',
        });
    }
};

// Fetch task by ID
export const getTaskById = async (req: Request, res: Response): Promise<void> => {
    try {
        const task: ITask | null = await taskService.getTaskById(req.params.id);
        if (!task) {
            res.status(404).json({ success: false, message: 'Task not found' });
            return;
        }
        res.status(200).json({ success: true, data: task });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch task',
            error: error instanceof Error ? error.message : 'An unexpected error occurred',
        });
    }
};

// Update task status
export const updateTaskStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { status } = req.body;
        const task: ITask | null = await taskService.updateTaskStatus(req.params.id, status);
        if (!task) {
            res.status(404).json({ success: false, message: 'Task not found' });
            return;
        }
        res.status(200).json({ success: true, data: task });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update task status',
            error: error instanceof Error ? error.message : 'An unexpected error occurred',
        });
    }
};

// Delete a task
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const success = await taskService.deleteTask(req.params.id);
        if (!success) {
            res.status(404).json({ success: false, message: 'Task not found' });
            return;
        }
        res.status(200).json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete task',
            error: error instanceof Error ? error.message : 'An unexpected error occurred',
        });
    }
};
