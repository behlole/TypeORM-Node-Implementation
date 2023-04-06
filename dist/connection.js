"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const conn = (0, typeorm_1.createConnection)({
    type: 'postgres',
    database: 'blog',
    entities: ['./models/*.ts'],
    username: 'postgres',
    password: 'root',
    synchronize: true,
    logging: true
});
exports.default = conn;
