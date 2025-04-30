// interfaces/task.interface.ts
import { Document, Types } from 'mongoose';

export interface Task {
  id: string;
  title: string;
  description: string;
  price: number;
  completed: boolean;
  createdAt: Date;
  updatedAt?: Date
}
