
import { Book, BookProps } from "../entities/Book";

export interface IBookRepository {

    add(book: Book): Promise<Book>;
    retrieveOne(id: String): Promise<Book>;
    deleteOne(id: String): Promise<void>;
    updateOne(id: String, bookData: BookProps): Promise<Book>;
    retrieveAll(): Promise<Book[]>;
}
