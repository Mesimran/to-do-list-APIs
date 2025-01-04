import Task, { ITask } from '../models/taskModel';

export const createTask = async (taskData: Partial<ITask>): Promise<ITask> => {
    return await Task.create(taskData);
};

export const getAllTasks = async (): Promise<ITask[]> => {
    return await Task.find();
};

export const getTaskById = async (id: string): Promise<ITask | null> => {
    return await Task.findById(id);
};

export const updateTaskStatus = async (id: string, status: string): Promise<ITask | null> => {
    return await Task.findByIdAndUpdate(id, { status }, { new: true });
};

export const deleteTask = async (id: string): Promise<boolean> => {
    const task = await Task.findByIdAndDelete(id);
    return !!task;
};
