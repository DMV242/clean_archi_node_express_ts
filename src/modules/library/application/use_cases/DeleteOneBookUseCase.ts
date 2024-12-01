import { IBookRepository } from "../../domain/repositories/IBookRepository";

export class DeleteOneBookUseCase {

    private bookRepository: IBookRepository;

    constructor(bookRepository: IBookRepository) {
        this.bookRepository = bookRepository;
    }

    async execute(id: string): Promise<void> {
        await this.bookRepository.deleteOne(id);
    }
}