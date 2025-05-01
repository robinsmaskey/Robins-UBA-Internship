//New code
import { Task } from '../interfaces/task.interface';
import { 
  findAll, 
  findOne, 
  create, 
  update, 
  remove 
} from '../services/task.service';

export const resolvers = {
  Query: {
    tasks: async (_: unknown, { limit, offset }: { limit?: number; offset?: number }): Promise<Task[]> => {
      const allTasks = await findAll();
      
      // Apply pagination if parameters are provided
      let result = [...allTasks];
      if (offset) result = result.slice(offset);
      if (limit) result = result.slice(0, limit);
      
      return result;
    },
    
    task: async (_: unknown, { id }: { id: string }): Promise<Task | null> => {
      const task = await findOne(id);
      return task || null;
    }
  },
  
  Mutation: {
    createTask: async (
      _: unknown, 
      { input }: { input: { 
        title: string; 
        description: string; 
        price: number; 
        completed?: boolean 
      }}
    ): Promise<Task> => {
      return await create({
        title: input.title,
        description: input.description,
        price: input.price,
        completed: input.completed || false
      });
    },
    
    updateTask: async (
      _: unknown, 
      { id, input }: { 
        id: string;
        input: {
          title?: string; 
          description?: string; 
          price?: number; 
          completed?: boolean 
        }
      }
    ): Promise<Task | null> => {
      const updateData: Partial<Task> = {};
      
      if (input.title) updateData.title = input.title;
      if (input.description) updateData.description = input.description;
      if (input.price) updateData.price = input.price;
      if (input.completed !== undefined) updateData.completed = input.completed;
      
      return await update(id, updateData);
    },
    
    deleteTask: async (_: unknown, { id }: { id: string }): Promise<boolean> => {
      const result = await remove(id);
      return result !== null;
    },
    
    toggleTask: async (_: unknown, { id }: { id: string }): Promise<Task | null> => {
      const task = await findOne(id);
      if (!task) return null;
      
      return await update(id, {
        completed: !task.completed
      });
    }
  }
};