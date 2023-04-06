import http from 'http';
import express, {Express, Request, Response} from 'express';
import routes from './routes';
import conn from "./connection";

const router: Express = express();

router.use(express.urlencoded({extended: false}));
router.use(express.json());


router.use('/', routes);

router.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});


const PORT: any = process.env.PORT ?? 6060;
conn.then((data) => {
    console.log("Database connected")
    router.listen(PORT, () => {
        console.log(`The server is running on port ${PORT}`)
    })
}).catch((error) => {
    console.log(error.message)
    console.log("Server could not be started")
})
