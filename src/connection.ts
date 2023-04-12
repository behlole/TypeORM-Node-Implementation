import {createConnection} from "typeorm";
import User from "./modules/Authentication/models/User";

export default createConnection({
    host: "localhost",
    type: "postgres",
    database: 'blog',
    port: 5432,
    username: 'postgres',
    password: 'root',
    entities: [User],
    synchronize: true,
    logging: true,
})