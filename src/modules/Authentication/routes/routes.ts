import express, {Express, Request, Response} from 'express';
import UserController from "../controllers/UserController";
import AuthenticationMiddleware from "../../../Shared/Middleware/AuthenticationMiddleware";
import bookRouter from "./bookRoutes";

const userRouter: Express = express();

userRouter.get('/',AuthenticationMiddleware.isAuthentication, UserController.getUser)
userRouter.post('/', UserController.register)
userRouter.post('/login', UserController.loginUser)
userRouter.use('/books',AuthenticationMiddleware.isAuthentication,bookRouter);


export default userRouter;