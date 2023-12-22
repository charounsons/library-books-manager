// src/tasks/interfaces/task.interface.ts
import { Document } from 'mongoose';

export interface Task extends Document {
  title: string;
  description: string;
}
