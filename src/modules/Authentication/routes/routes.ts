import express, {Express, Request, Response} from 'express';
import UserController from "../controllers/UserController";
import AuthenticationMiddleware from "../../../Shared/Middleware/AuthenticationMiddleware";

const userRouter: Express = express();

userRouter.get('/',AuthenticationMiddleware.isAuthentication, UserController.getUser)
userRouter.post('/', UserController.register)
userRouter.post('/login', UserController.loginUser)

export default userRouter;