import { Router } from "express";
import { BookController } from "../controllers/BookController";
import { validationMiddleware } from "../../../application/middlewares/validationMiddleware";
import { CreateBookDTO } from "../../../application/dtos/AddBookDto";
import { UpdateBookDTO } from "../../../application/dtos/UpdateDto";


export const bookRoutes = (bookController: BookController): Router => {
    const router = Router();
    router.get("/books", (req, res) => bookController.retreiveAllBooks(req, res));
    router.post("/books", validationMiddleware(CreateBookDTO), (req, res, next) => bookController.addBook(req, res).then(() => next()).catch(next));
    router.get("/books/:id", (req, res) => bookController.retrieveOneBook(req, res));
    router.delete("/books/:id", (req, res) => bookController.deleteOneBook(req, res));
    router.put("/books/:id", validationMiddleware(UpdateBookDTO), (req, res) => bookController.updateBook(req, res));
    return router;
};
