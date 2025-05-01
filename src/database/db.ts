// import { promises as fs } from 'fs';
// import path from 'path';
// import { v4 as uuidv4 } from 'uuid';
// import { Task } from '../interfaces/task.interface';

// const DB_PATH = path.join(__dirname, '../../db.json');

// interface Database {
//   tasks: Task[];
// }

// // Enhanced database initialization
// async function initDB(): Promise<void> {
//   try {
//     // Verify file exists and is accessible
//     await fs.access(DB_PATH);
    
//     // Verify file has valid JSON
//     const initialContent = await fs.readFile(DB_PATH, 'utf-8');
//     try {
//       JSON.parse(initialContent);
//       console.log('Database path:', DB_PATH);
//       console.log('Database file is valid JSON');
//     } catch (e) {
//       console.error('Database file contains invalid JSON, recreating...');
//       await createFreshDB();
//     }
    
//     // Verify database structure
//     const db = await readDB();
//     if (!db.tasks || !Array.isArray(db.tasks)) {
//       console.error('Invalid database structure, recreating...');
//       await createFreshDB();
//     }
//   } catch (error: unknown) {
//     if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
//       console.log('Database file not found, creating new one...');
//       await createFreshDB();
//     } else {
//       console.error('Database initialization error:', error instanceof Error ? error.message : error);
//       throw error;
//     }
//   }
// }

// async function createFreshDB(): Promise<void> {
//   const initialData: Database = {
//     tasks: [
//       {
//         id: uuidv4(),
//         title: 'Sample Task',
//         description: 'This is a sample task',
//         price: 100,
//         completed: false,
//         createdAt: new Date().toISOString()
//       }
//     ]
//   };
//   await fs.writeFile(DB_PATH, JSON.stringify(initialData, null, 2), 'utf-8');
//   console.log('New database file created with sample data');
// }

// // Read database with validation
// async function readDB(): Promise<Database> {
//   try {
//     const data = await fs.readFile(DB_PATH, 'utf-8');
//     const db = JSON.parse(data) as Database;
    
//     if (!db || typeof db !== 'object') {
//       throw new Error('Invalid database format');
//     }
    
//     if (!db.tasks || !Array.isArray(db.tasks)) {
//       throw new Error('Tasks array missing in database');
//     }
    
//     return db;
//   } catch (error: unknown) {
//     console.error('Error reading database:', error instanceof Error ? error.message : error);
//     throw new Error('Failed to read database');
//   }
// }

// // Write to database with validation
// async function writeDB(data: Database): Promise<void> {
//   try {
//     if (!data || typeof data !== 'object') {
//       throw new Error('Invalid data to write');
//     }
    
//     if (!data.tasks || !Array.isArray(data.tasks)) {
//       throw new Error('Tasks array missing in data');
//     }
    
//     await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
//   } catch (error: unknown) {
//     console.error('Error writing to database:', error instanceof Error ? error.message : error);
//     throw new Error('Failed to write to database');
//   }
// }

// // Initialize database with retry logic
// async function initializeDatabaseWithRetry(retries = 3, delay = 1000): Promise<void> {
//   try {
//     await initDB();
//     console.log('Database initialized successfully');
//   } catch (error: unknown) {
//     if (retries > 0) {
//       console.log(`Retrying database initialization (${retries} left)...`);
//       await new Promise(resolve => setTimeout(resolve, delay));
//       await initializeDatabaseWithRetry(retries - 1, delay * 2);
//     } else {
//       console.error('Failed to initialize database after retries:', error instanceof Error ? error.message : error);
//       throw new Error('Failed to initialize database');
//     }
//   }
// }

// // Initialize immediately with error handling
// initializeDatabaseWithRetry().catch((error: unknown) => {
//   console.error('Critical: Failed to initialize database:', error instanceof Error ? error.message : error);
//   process.exit(1);
// });

// export const taskService = {
//   getAllTasks: async (): Promise<Task[]> => {
//     try {
//       const db = await readDB();
//       return db.tasks;
//     } catch (error: unknown) {
//       console.error('Error getting all tasks:', error instanceof Error ? error.message : error);
//       throw new Error('Failed to retrieve tasks');
//     }
//   },

//   getTaskById: async (id: string): Promise<Task> => {
//     try {
//       if (!id) throw new Error('Invalid task ID');
      
//       const db = await readDB();
//       const task  = await db.tasks.find(task => task.id === id);
//       return task as Task;
//     } catch (error: unknown) {
//       console.error(`Error getting task ${id}:`, error instanceof Error ? error.message : error);
//       throw new Error('Failed to retrieve task');
//     }
//   },

//   createTask: async (taskData: { 
//     title: string; 
//     description: string; 
//     price: number; 
//     completed?: boolean 
//   }): Promise<Task> => {
//     try {
//       // if (!taskData.title || !taskData.description) {
//       //   throw new Error('Title and description are required');
//       // }
//       console.log(taskData);
//       const db = await readDB();
//       const newTask: Task = {
//         id: uuidv4(),
//         title: taskData.title,
//         description: taskData.description,
//         price: taskData.price,
//         completed: taskData.completed || false,
//         createdAt: new Date().toISOString()
//       };
      
//       db.tasks.push(newTask);
//       await writeDB(db);
//       return newTask;
//     } catch (error: unknown) {
//       console.error('Error creating task:', error instanceof Error ? error.message : error);
//       throw new Error('Failed to create task');
//     }
//   },

//   updateTask: async (
//     id: string, 
//     updates: { 
//       title?: string; 
//       description?: string; 
//       price?: number; 
//       completed?: boolean 
//     }
//   ): Promise<Task | null> => {
//     try {
//       if (!id) throw new Error('Invalid task ID');
      
//       const db = await readDB();
//       const taskIndex = db.tasks.findIndex(task => task.id === id);
      
//       if (taskIndex === -1) return null;
      
//       db.tasks[taskIndex] = {
//         ...db.tasks[taskIndex],
//         ...updates
//       };
      
//       await writeDB(db);
//       return db.tasks[taskIndex];
//     } catch (error: unknown) {
//       console.error(`Error updating task ${id}:`, error instanceof Error ? error.message : error);
//       throw new Error('Failed to update task');
//     }
//   },

//   deleteTask: async (id: string): Promise<boolean> => {
//     try {
//       if (!id) throw new Error('Invalid task ID');
      
//       const db = await readDB();
//       const initialLength = db.tasks.length;
//       db.tasks = db.tasks.filter(task => task.id !== id);
      
//       if (db.tasks.length < initialLength) {
//         await writeDB(db);
//         return true;
//       }
//       return false;
//     } catch (error: unknown) {
//       console.error(`Error deleting task ${id}:`, error instanceof Error ? error.message : error);
//       throw new Error('Failed to delete task');
//     }
//   },

//   toggleTaskCompletion: async (id: string): Promise<Task | null> => {
//     try {
//       if (!id) throw new Error('Invalid task ID');
      
//       const db = await readDB();
//       const task = db.tasks.find(task => task.id === id);
      
//       if (!task) return null;
      
//       task.completed = !task.completed;
//       await writeDB(db);
//       return task;
//     } catch (error: unknown) {
//       console.error(`Error toggling task ${id}:`, error instanceof Error ? error.message : error);
//       throw new Error('Failed to toggle task completion');
//     }
//   },

//   // Add debug method to verify database state
//   debugDatabase: async (): Promise<Database> => {
//     return readDB();
//   }
// };