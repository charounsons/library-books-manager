// src/tasks/tasks.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './interfaces/task.interface';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task | undefined> {
    return this.tasksService.findOne(id);
  }

  @Post()
  async create(@Body() task: Task): Promise<Task> {
    return this.tasksService.create(task);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() task: Task,
  ): Promise<Task | undefined> {
    return this.tasksService.update(id, task);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.tasksService.remove(id);
  }
}
