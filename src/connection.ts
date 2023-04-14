import {createConnection} from "typeorm";
import User from "./modules/Authentication/models/User";
import Book from "./modules/Authentication/models/Books";

export default createConnection({
    host: "localhost",
    type: "postgres",
    database: 'blog',
    port: 5432,
    username: 'postgres',
    password: 'root',
    entities: [User,Book],
    synchronize: true,
    logging: true,
})