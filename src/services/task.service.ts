import { Task } from "../interfaces/task.interface";

let tasks: Task[] = [];

export const findAll = async (): Promise<Task[]> => tasks;

export const findOne = async (id: string): Promise<Task | undefined> => {
  return tasks.find(task => task.id === id);
};

export const create = async (newTask: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
  const task: Task = {
    id: (tasks.length + 1).toString(),
    ...newTask,
    createdAt: new Date()
  };
  tasks.push(task);
  return task;
};

export const update = async (id: string, taskUpdate: Partial<Task>): Promise<Task | null> => {
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex === -1) return null;
  
  tasks[taskIndex] = { ...tasks[taskIndex], ...taskUpdate };
  return tasks[taskIndex];
};

export const remove = async (id: string): Promise<Task | null> => {
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex === -1) return null;
  
  const deletedTask = tasks[taskIndex];
  tasks = tasks.filter(task => task.id !== id);
  return deletedTask;
};