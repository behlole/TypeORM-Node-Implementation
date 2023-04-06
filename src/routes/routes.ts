import express,{Express,Request,Response} from 'express';

const router: Express = express();


router.get('/',(req:Request,res:Response)=>{
    res.send({
        "body":"users"
    })
});

export default router;