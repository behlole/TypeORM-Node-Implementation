"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const connection_1 = __importDefault(require("./connection"));
const router = (0, express_1.default)();
router.use(express_1.default.urlencoded({ extended: false }));
router.use(express_1.default.json());
router.use('/', routes_1.default);
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
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 6060;
connection_1.default.then((data) => {
    console.log("Database connected");
    router.listen(PORT, () => {
        console.log(`The server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.log(error.message);
    console.log("Server could not be started");
});
