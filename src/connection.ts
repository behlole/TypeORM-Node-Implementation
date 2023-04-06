import {createConnection} from "typeorm";
import User from "./models/User";

export default createConnection({
    host: "localhost",
    type: "postgres",
    database: 'nodejsPractice',
    port: 5432,
    username: 'postgres',
    password: 'root',
    entities: [User],
    synchronize: true,
    logging: true,
})