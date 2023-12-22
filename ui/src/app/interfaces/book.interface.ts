// src/app/services/book/book.interface.ts
export interface Book {
  _id?: string;
  title: string;
  author: string;
  createdAt?: Date;
}