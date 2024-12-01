import { Book, BookProps } from "../../domain/entities/Book";
import { IBookRepository } from "../../domain/repositories/IBookRepository";

export class RetrieveBookUseCase {
  private bookRepository: IBookRepository;

  constructor(bookRepository: IBookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute(id: String): Promise<BookProps> {
    const book = await this.bookRepository.retrieveOne(id);
    return book;
  }
}
