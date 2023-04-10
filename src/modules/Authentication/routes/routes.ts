import express, {Express, Request, Response} from 'express';
import UserController from "../controllers/UserController";

const userRouter: Express = express();

userRouter.get('/', UserController.getUser)
userRouter.post('/', UserController.register)

export default userRouter;