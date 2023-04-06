"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("./models/User"));
exports.default = (0, typeorm_1.createConnection)({
    host: "localhost",
    type: "postgres",
    database: 'nodejsPractice',
    port: 5432,
    username: 'postgres',
    password: 'root',
    entities: [User_1.default],
    synchronize: true,
    logging: true,
});
