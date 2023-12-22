// src/books/books.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { BooksService } from './books.service';
import { Book } from './interfaces/book.interface';

const mockBookModel = {
  find: jest.fn(),
  findById: jest.fn(),
  create: jest.fn().mockResolvedValueOnce((book) => ({
    ...book,
    save: jest.fn().mockResolvedValueOnce(book),
  })),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  deleteMany: jest.fn(),
};

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken('Book'),
          useValue: mockBookModel,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all books', async () => {
    const mockBooks: Book[] = [{ title: 'Book 1', author: 'Author 1' }];
    const mockQuery = {
      sort: jest.fn().mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockBooks),
      }),
    };
    mockBookModel.find.mockReturnValueOnce(mockQuery);

    const result = await service.findAll();

    expect(result).toEqual(mockBooks);
  });

  it('should find one book by id', async () => {
    const mockBook: Book = { title: 'Book 1', author: 'Author 1' };
    const mockQuery = {
      exec: jest.fn().mockResolvedValueOnce(mockBook),
    };
    mockBookModel.findById.mockReturnValueOnce(mockQuery);

    const result = await service.findOne('1');

    expect(result).toEqual(mockBook);
  });

  it.skip('should create a new book', async () => {
    const newBook: Book = { title: 'New Book', author: 'New Author' };
    const mockCreate = jest.fn().mockResolvedValueOnce(newBook);

    jest.spyOn(mockBookModel, 'create').mockImplementationOnce(mockCreate);

    const result = await service.create(newBook);

    expect(result).toEqual(newBook);
    expect(mockCreate).toHaveBeenCalledWith(newBook);
  });

  it('should update a book by id', async () => {
    const updatedBook: Book = { title: 'Updated Book', author: 'Updated Author' };
    const mockQuery = {
      exec: jest.fn().mockResolvedValueOnce(updatedBook),
    };
    mockBookModel.findByIdAndUpdate.mockReturnValueOnce(mockQuery);

    const result = await service.update('1', updatedBook);

    expect(result).toEqual(updatedBook);
  });

  it('should remove a book by id', async () => {
    const mockQuery = {
      exec: jest.fn().mockResolvedValueOnce(null),
    };
    mockBookModel.findByIdAndDelete.mockReturnValueOnce(mockQuery);

    await service.remove('1');

    expect(mockBookModel.findByIdAndDelete).toHaveBeenCalledWith('1');
  });

  it('should remove all books', async () => {
    const mockQuery = {
      exec: jest.fn(),
    };
    mockBookModel.deleteMany.mockReturnValueOnce(mockQuery);

    await service.removeAll();

    expect(mockBookModel.deleteMany).toHaveBeenCalled();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
