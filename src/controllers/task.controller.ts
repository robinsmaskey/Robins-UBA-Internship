import { Request, Response } from 'express';
import * as taskService from '../services/task.service';
import { Task } from '../interfaces/task.interface';

// export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const tasks = await taskService.findAll();
//     res.status(200).json(tasks);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching tasks' });
//   }
// };

// src/controllers/task.controller.ts
export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
    try {
      const tasks = await taskService.findAll();
      
      // Option 1: Return all fields (current behavior)
      res.status(200).json(tasks);
      
      // Option 2: Explicitly select fields to return
      const response = tasks.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description
        // Add other fields you want to include
      }));
      
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching tasks' });
    }
  };

export const getTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await taskService.findOne(req.params.id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task' });
  }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const newTask = await taskService.create(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task' });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedTask = await taskService.update(req.params.id, req.body);
    if (updatedTask) {
      res.status(200).json(updatedTask);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating task' });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTask = await taskService.remove(req.params.id);
    if (deletedTask) {
      res.status(200).json({ message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task' });
  }
};