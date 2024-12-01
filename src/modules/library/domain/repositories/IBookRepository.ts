import { Book, BookProps } from "../entities/Book";

export interface IBookRepository {
  add(book: Book): Promise<BookProps>;
  retrieveOne(id: String): Promise<BookProps>;
  deleteOne(id: String): Promise<void>;
  updateOne(id: String, bookData: Book): Promise<BookProps>;
  retrieveAll(): Promise<BookProps[]>;
}
