// src/models/task.model.ts
import { Schema, model, Document } from 'mongoose';
import { Task as TaskInterface } from '../interfaces/task.interface';

const TaskSchema = new Schema<TaskInterface>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

export const Task = model<TaskInterface>('Task', TaskSchema);