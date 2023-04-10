import express,{Express} from 'express';
import userRoutes from './modules/Authentication/routes/routes';

const router: Express = express();


router.use('/users',userRoutes);

export default router;