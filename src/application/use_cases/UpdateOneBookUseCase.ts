import { Book, BookProps } from "../../domain/entities/Book";
import { IBookRepository } from "../../domain/repositories/IBookRepository";


export class UpdateOneBookUseCase {

    private bookRepository: IBookRepository;

    constructor(bookRepository: IBookRepository) {
        this.bookRepository = bookRepository;
    }

    async execute(id: String, bookData: BookProps): Promise<Book> {
        const book = await this.bookRepository.updateOne(id, bookData);
        return book;
    }
}