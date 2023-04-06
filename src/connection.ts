import {createConnection} from "typeorm";
import {UserEntity} from "./models/User";

const conn = createConnection(
    {
        type: 'postgres',
        database: 'blog',
        port: 5432,
        entities: [UserEntity],
        username: 'postgres',
        password: 'root',
        synchronize: true,
        logging: true,
    });
export default conn;