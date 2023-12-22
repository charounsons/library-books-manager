// src/tasks/schemas/task.schema.ts
import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
});
