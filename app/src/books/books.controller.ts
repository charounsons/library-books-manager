// src/books/books.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './interfaces/book.interface';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Book | undefined> {
    return this.booksService.findOne(id);
  }

  @Post()
  async create(@Body() book: Book): Promise<Book> {
    return this.booksService.create(book);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() book: Book,
  ): Promise<Book | undefined> {
    return this.booksService.update(id, book);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.booksService.remove(id);
  }

  @Delete()
  async removeAll(): Promise<void> {
    return this.booksService.removeAll();
  }
}
