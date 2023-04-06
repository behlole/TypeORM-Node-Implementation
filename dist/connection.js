"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = require("./models/User");
const conn = (0, typeorm_1.createConnection)({
    type: 'postgres',
    database: 'blog',
    port: 5432,
    entities: [User_1.UserEntity],
    username: 'postgres',
    password: 'root',
    synchronize: true,
    logging: true,
});
exports.default = conn;
