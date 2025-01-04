"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTaskStatus = exports.getTaskById = exports.getTasks = exports.createTask = void 0;
const taskService = __importStar(require("../services/taskServices"));
// Create a new task
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const task = yield taskService.createTask({ title, description });
        res.status(201).json({ success: true, data: task });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create task',
            error: error instanceof Error ? error.message : 'An unexpected error occurred',
        });
    }
});
exports.createTask = createTask;
// Fetch all tasks
const getTasks = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield taskService.getAllTasks();
        res.status(200).json({ success: true, data: tasks });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch tasks',
            error: error instanceof Error ? error.message : 'An unexpected error occurred',
        });
    }
});
exports.getTasks = getTasks;
// Fetch task by ID
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield taskService.getTaskById(req.params.id);
        if (!task) {
            res.status(404).json({ success: false, message: 'Task not found' });
            return;
        }
        res.status(200).json({ success: true, data: task });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch task',
            error: error instanceof Error ? error.message : 'An unexpected error occurred',
        });
    }
});
exports.getTaskById = getTaskById;
// Update task status
const updateTaskStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        const task = yield taskService.updateTaskStatus(req.params.id, status);
        if (!task) {
            res.status(404).json({ success: false, message: 'Task not found' });
            return;
        }
        res.status(200).json({ success: true, data: task });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update task status',
            error: error instanceof Error ? error.message : 'An unexpected error occurred',
        });
    }
});
exports.updateTaskStatus = updateTaskStatus;
// Delete a task
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const success = yield taskService.deleteTask(req.params.id);
        if (!success) {
            res.status(404).json({ success: false, message: 'Task not found' });
            return;
        }
        res.status(200).json({ success: true, message: 'Task deleted successfully' });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete task',
            error: error instanceof Error ? error.message : 'An unexpected error occurred',
        });
    }
});
exports.deleteTask = deleteTask;
