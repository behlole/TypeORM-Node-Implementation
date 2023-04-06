import {createConnection} from "typeorm";

const conn = createConnection(
    {
        type: 'postgres',
        database: 'blog',
        entities: ['./models/*.ts'],
        username: 'postgres',
        password: 'root',
        synchronize: true,
        logging: true
    });
export default conn;