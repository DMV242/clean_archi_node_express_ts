
import { configDotenv } from "dotenv";
import { AddBookUseCase } from "./application/use_cases/AddBookUseCase";
import { BookController } from "./infrastructure/webserver/controllers/BookController";
import { bookRoutes } from "./infrastructure/webserver/routes/bookRoutes";
import { RetrieveBookUseCase } from "./application/use_cases/RetrieveOneBookUseCase";
import { DeleteOneBookUseCase } from "./application/use_cases/DeleteOneBookUseCase";
import { PrismaBookRepository } from "./infrastructure/repositories/PrismaBookReposiroty";
import { RetreiveAllBooksUseCase } from "./application/use_cases/RetrieveAllBooksUseCase";
import { UpdateOneBookUseCase } from "./application/use_cases/UpdateOneBookUseCase";

configDotenv();
const app: Application = express();
app.use(express.json());


const bookRepository = new PrismaBookRepository();
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

app.use("/api", bookRoutes(bookController));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
