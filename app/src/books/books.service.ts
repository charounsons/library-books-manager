// src/books/books.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './interfaces/book.interface';

@Injectable()
export class BooksService {
  constructor(@InjectModel('Book') private bookModel: Model<Book>) { }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Book | undefined> {
    return this.bookModel.findById(id).exec();
  }

  async create(book: Book): Promise<Book> {
    const createdBook = new this.bookModel(book);
    // const createdBook = await this.bookModel.create(book);
    return createdBook.save();
    // return this.bookModel.create(book);
  }

  async update(id: string, book: Book): Promise<Book | undefined> {
    return this.bookModel.findByIdAndUpdate(id, book, { new: true }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.bookModel.findByIdAndDelete(id).exec();
  }

  async removeAll(): Promise<void> {
    await this.bookModel.deleteMany().exec();
  }
}
