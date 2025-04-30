import { Task } from '../models/task.model';  // This was missing
import { Task as TaskInterface } from '../interfaces/task.interface';

const toTaskObject = (task: any): TaskInterface => {
  return {
    id: task._id ? task._id.toString() : task.id,
    title: task.title,
    description: task.description,
    price: task.price,
    completed: task.completed,
    createdAt: task.createdAt
  };
};

export const resolvers = {
  Query: {
    tasks: async (): Promise<TaskInterface[]> => {
      const tasks = await Task.find().exec();
      return tasks.map(toTaskObject);
    },
    hello(){
        return 5
        },
    task: async (_: any, { id }: { id: string }): Promise<TaskInterface | null> => {
      const task = await Task.findById(id).exec();
      return task ? toTaskObject(task) : null;
    },
  },
  Mutation: {
    createTask: async (_: any, { input }: { input: Omit<TaskInterface, 'id' | 'createdAt'> }): Promise<TaskInterface> => {
      const task = new Task(input);
      const result = await task.save();
      return toTaskObject(result);
    },
    updateTask: async (_: any, { id, input }: { id: string; input: Partial<TaskInterface> }): Promise<TaskInterface | null> => {
      const task = await Task.findByIdAndUpdate(id, input, { new: true }).exec();
      return task ? toTaskObject(task) : null;
    },
    deleteTask: async (_: any, { id }: { id: string }): Promise<boolean> => {
      const result = await Task.findByIdAndDelete(id).exec();
      return !!result;
    },
  },
  Task: {
    createdAt: (parent: TaskInterface) => parent.createdAt.toISOString()
  }
};