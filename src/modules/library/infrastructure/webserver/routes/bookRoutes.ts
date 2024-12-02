import { Router } from "express";
import { BookController } from "../controllers/BookController";
import { CreateBookDTO } from "../../../application/dtos/AddBookDto";
import { UpdateBookDTO } from "../../../application/dtos/UpdateDto";
import { validationMiddleware } from "../../../../../shared/middlewares/validationMiddleware";
import { IsAuthenticatedMiddleware } from "../../../../security/infrasctructure/Webserver/middlewares/IsAuthenticated";
import { JwtTokenEncoder } from "../../../../security/infrasctructure/token_encoder/JwtTokenEncoder";

const isAuthenticatedMiddleware = new IsAuthenticatedMiddleware(
  new JwtTokenEncoder(process.env.JWT_SECRET!)
);
const isAuthenticated = isAuthenticatedMiddleware.verify.bind(
  isAuthenticatedMiddleware
);

export const bookRoutes = (bookController: BookController): Router => {
  const router = Router();
  router.get("/books", isAuthenticated, (req, res) =>
    bookController.retreiveAllBooks(req, res)
  );
  router.post(
    "/books",
    isAuthenticated,
    validationMiddleware(CreateBookDTO),
    (req, res, next) =>
      bookController
        .addBook(req, res)
        .then(() => next())
        .catch(next)
  );
  router.get("/books/:id", isAuthenticated, (req, res) =>
    bookController.retrieveOneBook(req, res)
  );
  router.delete("/books/:id", isAuthenticated, (req, res) =>
    bookController.deleteOneBook(req, res)
  );
  router.put(
    "/books/:id",
    isAuthenticated,
    validationMiddleware(UpdateBookDTO),
    (req, res) => bookController.updateBook(req, res)
  );
  return router;
};
