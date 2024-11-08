import { Request, Response } from "express";
import { AddBookUseCase } from "../../../application/use_cases/AddBookUseCase";
import { RetrieveBookUseCase } from "../../../application/use_cases/RetrieveOneBookUseCase";
import { DeleteOneBookUseCase } from "../../../application/use_cases/DeleteOneBookUseCase";
import { RetreiveAllBooksUseCase } from "../../../application/use_cases/RetrieveAllBooksUseCase";
import { UpdateOneBookUseCase } from "../../../application/use_cases/UpdateOneBookUseCase";


export class BookController {
    private addBookUseCase: AddBookUseCase;
    private retreiveOneBookUseCase: RetrieveBookUseCase;
    private deleteOneBookUseCase: DeleteOneBookUseCase;
    private retreiveAllBooksUseCase: RetreiveAllBooksUseCase;
    private updateBookUseCase: UpdateOneBookUseCase;

    constructor(
        addBookUseCase: AddBookUseCase,
        RetreiveOneBookUseCase: RetrieveBookUseCase,
        deleteOneBookUseCase: DeleteOneBookUseCase,
        retreiveAllBooksUseCase: RetreiveAllBooksUseCase,
        updateBookUseCase: UpdateOneBookUseCase
    ){
        this.addBookUseCase = addBookUseCase;
        this.retreiveOneBookUseCase = RetreiveOneBookUseCase;
        this.deleteOneBookUseCase = deleteOneBookUseCase;
        this.retreiveAllBooksUseCase = retreiveAllBooksUseCase;
        this.updateBookUseCase = updateBookUseCase;
    }

    async addBook(req: Request, res: Response): Promise<void> {
        try {
            const bookData = req.body;
            const book = await this.addBookUseCase.execute(bookData);
            res.status(201).json(book);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    async retrieveOneBook(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const book = await this.retreiveOneBookUseCase.execute(id);
            if (!book) {
                res.status(404).json({ error: "Book not found" });
                return;
            }
            res.status(200).json(book);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    async deleteOneBook(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            await this.deleteOneBookUseCase.execute(id);
            res.status(204).end();
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    async retreiveAllBooks(req: Request, res: Response): Promise<void> {
        try {
            const books = await this.retreiveAllBooksUseCase.execute();
            res.status(200).json(books);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    async updateBook(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const bookData = req.body;
            const book = await this.retreiveOneBookUseCase.execute(id);
            if (book) {
                const updatedBook = await this.updateBookUseCase.execute(id, bookData);
                res.status(200).json(updatedBook);
            } else {
                res.status(404).json({ error: "Book not found" });
            }
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }
}
