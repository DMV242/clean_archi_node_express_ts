import express, { Application } from "express";
import { configDotenv } from "dotenv";

import { AddBookUseCase } from "./modules/library/application/use_cases/AddBookUseCase";
import { RetrieveBookUseCase } from "./modules/library/application/use_cases/RetrieveOneBookUseCase";
import { DeleteOneBookUseCase } from "./modules/library/application/use_cases/DeleteOneBookUseCase";
import { UpdateOneBookUseCase } from "./modules/library/application/use_cases/UpdateOneBookUseCase";
import { RetreiveAllBooksUseCase } from "./modules/library/application/use_cases/RetrieveAllBooksUseCase";
import { PrismaBookRepository } from "./modules/library/infrastructure/repositories/PrismaBookReposiroty";
import { BookController } from "./modules/library/infrastructure/webserver/controllers/BookController";
import { bookRoutes } from "./modules/library/infrastructure/webserver/routes/bookRoutes";
import { securityRoutes } from "./modules/security/infrasctructure/Webserver/routes/SecurityRoutes";
import { SecurityController } from "./modules/security/infrasctructure/Webserver/controllers/SecurityController";
import { SignUpUseCase } from "./modules/security/application/uses_cases/SignUpUseCase";
import { UserRepository } from "./modules/security/infrasctructure/repositories/UserRepository";
import { SignInUseCase } from "./modules/security/application/uses_cases/SignInUseCase";

configDotenv();
const app: Application = express();
app.use(express.json());

const bookRepository = new PrismaBookRepository();
const userRepository = new UserRepository();
const addBookUseCase = new AddBookUseCase(bookRepository);
const retreiveOneBookUseCase = new RetrieveBookUseCase(bookRepository);
const deleteOneBookUseCase = new DeleteOneBookUseCase(bookRepository);
const retreiveAllBooksUseCase = new RetreiveAllBooksUseCase(bookRepository);
const updateOneBookUseCase = new UpdateOneBookUseCase(bookRepository);
const bookController = new BookController(
  addBookUseCase,
  retreiveOneBookUseCase,
  deleteOneBookUseCase,
  retreiveAllBooksUseCase,
  updateOneBookUseCase
);

const securityController = new SecurityController(
  new SignUpUseCase(userRepository),
  new SignInUseCase(userRepository)
);

app.use("/api", bookRoutes(bookController));
app.use("/api", securityRoutes(securityController));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
