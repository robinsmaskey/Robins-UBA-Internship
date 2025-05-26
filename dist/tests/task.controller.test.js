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
Object.defineProperty(exports, "__esModule", { value: true });
const taskController = __importStar(require("../controllers/task.controller"));
const taskService = __importStar(require("../services/task.service"));
// Mock the entire task service module
jest.mock('../services/task.service');
describe('Task Controller', () => {
    let mockRequest;
    let mockResponse;
    let mockNext;
    // Helper function to create consistent mock dates
    const mockDateString = new Date().toISOString();
    // Sample task data
    const mockTask = {
        id: '1',
        title: 'Test Task',
        description: 'Test Description',
        price: 1000,
        completed: false,
        createdAt: mockDateString,
        updatedAt: new Date()
    };
    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();
        // Setup mock request, response, and next function
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });
    describe('getAllTasks', () => {
        it('should return all tasks with status 200', async () => {
            // Mock service response
            taskService.findAll.mockResolvedValue([mockTask]);
            await taskController.getAllTasks(mockRequest, mockResponse);
            expect(taskService.findAll).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith([mockTask]);
        });
        it('should handle errors and return status 500', async () => {
            const errorMessage = 'Database error';
            taskService.findAll.mockRejectedValue(new Error(errorMessage));
            await taskController.getAllTasks(mockRequest, mockResponse);
            expect(taskService.findAll).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error fetching tasks' });
        });
    });
    describe('getTask', () => {
        it('should return a task with status 200 when task exists', async () => {
            mockRequest.params = { id: '1' };
            taskService.findOne.mockResolvedValue(mockTask);
            await taskController.getTask(mockRequest, mockResponse);
            expect(taskService.findOne).toHaveBeenCalledWith('1');
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(mockTask);
        });
        it('should return 404 when task does not exist', async () => {
            mockRequest.params = { id: '999' };
            taskService.findOne.mockResolvedValue(null);
            await taskController.getTask(mockRequest, mockResponse);
            expect(taskService.findOne).toHaveBeenCalledWith('999');
            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Task not found' });
        });
        it('should handle errors and return status 500', async () => {
            mockRequest.params = { id: '1' };
            taskService.findOne.mockRejectedValue(new Error('Database error'));
            await taskController.getTask(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error fetching task' });
        });
    });
    describe('createTask', () => {
        it('should create a task and return status 201', async () => {
            mockRequest.body = {
                title: 'New Task',
                description: 'New Description'
            };
            taskService.create.mockResolvedValue(mockTask);
            await taskController.createTask(mockRequest, mockResponse);
            expect(taskService.create).toHaveBeenCalledWith(mockRequest.body);
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith(mockTask);
        });
        it('should handle errors and return status 500', async () => {
            mockRequest.body = {
                title: 'New Task',
                description: 'New Description'
            };
            taskService.create.mockRejectedValue(new Error('Database error'));
            await taskController.createTask(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error creating task' });
        });
    });
    describe('updateTask', () => {
        it('should update a task and return status 200', async () => {
            mockRequest.params = { id: '1' };
            mockRequest.body = {
                title: 'Updated Task',
                completed: true
            };
            taskService.update.mockResolvedValue(mockTask);
            await taskController.updateTask(mockRequest, mockResponse);
            expect(taskService.update).toHaveBeenCalledWith('1', mockRequest.body);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(mockTask);
        });
        it('should return 404 when task to update does not exist', async () => {
            mockRequest.params = { id: '999' };
            mockRequest.body = {
                title: 'Updated Task',
                completed: true
            };
            taskService.update.mockResolvedValue(null);
            await taskController.updateTask(mockRequest, mockResponse);
            expect(taskService.update).toHaveBeenCalledWith('999', mockRequest.body);
            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Task not found' });
        });
        it('should handle errors and return status 500', async () => {
            mockRequest.params = { id: '1' };
            mockRequest.body = {
                title: 'Updated Task',
                completed: true
            };
            taskService.update.mockRejectedValue(new Error('Database error'));
            await taskController.updateTask(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error updating task' });
        });
    });
    describe('deleteTask', () => {
        it('should delete a task and return status 200', async () => {
            mockRequest.params = { id: '1' };
            taskService.remove.mockResolvedValue(mockTask);
            await taskController.deleteTask(mockRequest, mockResponse);
            expect(taskService.remove).toHaveBeenCalledWith('1');
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Task deleted successfully' });
        });
        it('should return 404 when task to delete does not exist', async () => {
            mockRequest.params = { id: '999' };
            taskService.remove.mockResolvedValue(null);
            await taskController.deleteTask(mockRequest, mockResponse);
            expect(taskService.remove).toHaveBeenCalledWith('999');
            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Task not found' });
        });
        it('should handle errors and return status 500', async () => {
            mockRequest.params = { id: '1' };
            taskService.remove.mockRejectedValue(new Error('Database error'));
            await taskController.deleteTask(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error deleting task' });
        });
    });
});
