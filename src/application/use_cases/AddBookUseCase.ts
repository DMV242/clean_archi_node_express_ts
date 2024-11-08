import { Book, BookProps } from "../../domain/entities/Book";
import { IBookRepository } from "../../domain/repositories/IBookRepository";

export class AddBookUseCase {
    private bookRepository: IBookRepository;

    constructor(bookRepository: IBookRepository) {
        this.bookRepository = bookRepository;
    }

    async execute(bookData: BookProps): Promise<Book> {
        const book = new Book(bookData);
        return await this.bookRepository.add(book);
    }
}
