// src/books/schemas/book.schema.ts
import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    // Add other properties as needed
  },
  { timestamps: true },
);
