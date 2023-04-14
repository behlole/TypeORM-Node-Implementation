import express, {Express, Request, Response} from 'express';
import UserController from "../controllers/UserController";
import AuthenticationMiddleware from "../../../Shared/Middleware/AuthenticationMiddleware";
import BooksController from "../controllers/BooksController";

const bookRouter: Express = express();


bookRouter.get('/:id?', BooksController.getBooks)
bookRouter.post('/', BooksController.addBook)


export default bookRouter;