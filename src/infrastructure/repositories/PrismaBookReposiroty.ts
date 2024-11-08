import { PrismaClient } from "@prisma/client";
import { Book } from "../../domain/entities/Book";
import { IBookRepository } from "../../domain/repositories/IBookRepository";

export class PrismaBookRepository implements IBookRepository {

    private prisma = new PrismaClient();

    async add(book: Book): Promise<Book> {
        const { title,author,genre,isAvailable } = book;
        const  createdBook=await this.prisma.book.create({
            data:{
                title,
                author,
                genre,
                isAvailable
            }
        });
        return createdBook ;
    }

    async retrieveOne(id: String): Promise<Book> {
        const book = await this.prisma.book.findUnique({
            where: {
                id : String(id)
            }
        });
        if (!book) {
            throw new Error(`Book with id ${id} not found`);
        }
        return book;
    }
    async deleteOne(id: String): Promise<void> {
        await this.prisma.book.delete({
            where: {
                id: String(id)
            }
        });
    }

    async updateOne(id: String, bookData: Book): Promise<Book> {
        const { title,author,genre,isAvailable } = bookData;
        const  updatedBook=await this.prisma.book.update({
            where: {
                id: String(id)
            },
            data:{
                title,
                author,
                genre,
                isAvailable
            }
        });
        return updatedBook ;
    }
    async retrieveAll(): Promise<Book[]> {
        const books = await this.prisma.book.findMany();
        return books;
    }
}
