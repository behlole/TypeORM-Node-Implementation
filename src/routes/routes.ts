import express, {Express, Request, Response} from 'express';
import UserController from "../controllers/UserController";

const router: Express = express();


router.get('/', UserController.getUser);
router.post('/', UserController.createUser);

export default router;