import { PrismaClient } from "@prisma/client";
import { Book, BookProps } from "../../domain/entities/Book";
import { IBookRepository } from "../../domain/repositories/IBookRepository";

export class PrismaBookRepository implements IBookRepository {
  private prisma = new PrismaClient();

  async add(book: Book): Promise<BookProps> {
    const { title, author, genre, isAvailable } = book.toObject();
    const createdBook = await this.prisma.book.create({
      data: {
        title,
        author,
        genre,
        isAvailable,
      },
    });
    return createdBook;
  }

  async retrieveOne(id: string): Promise<BookProps> {
    const book = await this.prisma.book.findUnique({
      where: {
        id: id,
      },
    });
    if (!book) {
      throw new Error(`Book with id ${id} not found`);
    }
    return book;
  }
  async deleteOne(id: string): Promise<void> {
    await this.prisma.book.delete({
      where: {
        id: id,
      },
    });
  }

  async updateOne(id: String, bookData: Book): Promise<BookProps> {
    const { title, author, genre, isAvailable } = bookData.toObject();
    const updatedBook = await this.prisma.book.update({
      where: {
        id: String(id),
      },
      data: {
        title,
        author,
        genre,
        isAvailable,
      },
    });
    return updatedBook;
  }
  async retrieveAll(): Promise<BookProps[]> {
    const books = await this.prisma.book.findMany();
    return books;
  }
}
