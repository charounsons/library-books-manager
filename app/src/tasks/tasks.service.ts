// src/tasks/tasks.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './interfaces/task.interface';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private taskModel: Model<Task>) {}

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task> {
    return this.taskModel.findById(id).exec();
  }

  async create(task: Task): Promise<Task> {
    const createdTask = new this.taskModel(task);
    return createdTask.save();
  }

  async update(id: string, task: Task): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, task, { new: true }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.taskModel.findByIdAndDelete(id).exec();
  }
}
