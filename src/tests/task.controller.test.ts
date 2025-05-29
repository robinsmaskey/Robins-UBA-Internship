import { Request, Response } from 'express';
import * as taskController from '../controllers/task.controller';
import * as taskService from '../services/task.service';
import { Task } from '../interfaces/task.interface';

// Mock the entire task service module
jest.mock('../services/task.service');

describe('Task Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock;

  // Helper function to create consistent mock dates
  const mockDateString = new Date().toISOString();

  // Sample task data
  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    price : 1000,
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
      (taskService.findAll as jest.Mock).mockResolvedValue([mockTask]);

      await taskController.getAllTasks(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(taskService.findAll).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith([mockTask]);
    });

    it('should handle errors and return status 500', async () => {
      const errorMessage = 'Database error';
      (taskService.findAll as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await taskController.getAllTasks(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(taskService.findAll).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error fetching tasks' });
    });
  });

  describe('getTask', () => {
    it('should return a task with status 200 when task exists', async () => {
      mockRequest.params = { id: '1' };
      (taskService.findOne as jest.Mock).mockResolvedValue(mockTask);

      await taskController.getTask(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(taskService.findOne).toHaveBeenCalledWith('1');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockTask);
    });

    it('should return 404 when task does not exist', async () => {
      mockRequest.params = { id: '999' };
      (taskService.findOne as jest.Mock).mockResolvedValue(null);

      await taskController.getTask(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(taskService.findOne).toHaveBeenCalledWith('999');
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Task not found' });
    });

    it('should handle errors and return status 500', async () => {
      mockRequest.params = { id: '1' };
      (taskService.findOne as jest.Mock).mockRejectedValue(new Error('Database error'));

      await taskController.getTask(
        mockRequest as Request,
        mockResponse as Response
      );

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
      (taskService.create as jest.Mock).mockResolvedValue(mockTask);

      await taskController.createTask(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(taskService.create).toHaveBeenCalledWith(mockRequest.body);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockTask);
    });

    it('should handle errors and return status 500', async () => {
      mockRequest.body = {
        title: 'New Task',
        description: 'New Description'
      };
      (taskService.create as jest.Mock).mockRejectedValue(new Error('Database error'));

      await taskController.createTask(
        mockRequest as Request,
        mockResponse as Response
      );

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
      (taskService.update as jest.Mock).mockResolvedValue(mockTask);

      await taskController.updateTask(
        mockRequest as Request,
        mockResponse as Response
      );

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
      (taskService.update as jest.Mock).mockResolvedValue(null);

      await taskController.updateTask(
        mockRequest as Request,
        mockResponse as Response
      );

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
      (taskService.update as jest.Mock).mockRejectedValue(new Error('Database error'));

      await taskController.updateTask(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error updating task' });
    });
  });

  describe('deleteTask', () => {
    it('should delete a task and return status 200', async () => {
      mockRequest.params = { id: '1' };
      (taskService.remove as jest.Mock).mockResolvedValue(mockTask);

      await taskController.deleteTask(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(taskService.remove).toHaveBeenCalledWith('1');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Task deleted successfully' });
    });

    it('should return 404 when task to delete does not exist', async () => {
      mockRequest.params = { id: '999' };
      (taskService.remove as jest.Mock).mockResolvedValue(null);

      await taskController.deleteTask(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(taskService.remove).toHaveBeenCalledWith('999');
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Task not found' });
    });

    it('should handle errors and return status 500', async () => {
      mockRequest.params = { id: '1' };
      (taskService.remove as jest.Mock).mockRejectedValue(new Error('Database error'));

      await taskController.deleteTask(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error deleting task' });
    });
  });
});