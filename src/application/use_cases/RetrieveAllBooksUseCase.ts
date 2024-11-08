import { Book } from "../../domain/entities/Book";
import {IBookRepository} from "../../domain/repositories/IBookRepository"


export class RetreiveAllBooksUseCase {
    private bookRepository: IBookRepository;

    constructor(bookRepository: IBookRepository) {
        this.bookRepository = bookRepository;
    }

    async execute(): Promise<Book[]> {
        return await this.bookRepository.retrieveAll();
    }
}