import { Book, BookProps } from "../../domain/entities/Book";
import { IBookRepository } from "../../domain/repositories/IBookRepository";

export class AddBookUseCase {
  private bookRepository: IBookRepository;

  constructor(bookRepository: IBookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute(bookData: BookProps): Promise<BookProps> {
    const { title, author, genre, isAvailable } = bookData;
    const book = new Book(title, author, genre, isAvailable);
    return await this.bookRepository.add(book);
  }
}
