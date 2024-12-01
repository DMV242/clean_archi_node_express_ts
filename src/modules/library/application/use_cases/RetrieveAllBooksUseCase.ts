import { Book, BookProps } from "../../domain/entities/Book";
import { IBookRepository } from "../../domain/repositories/IBookRepository";

export class RetreiveAllBooksUseCase {
  private bookRepository: IBookRepository;

  constructor(bookRepository: IBookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute(): Promise<BookProps[]> {
    return await this.bookRepository.retrieveAll();
  }
}
