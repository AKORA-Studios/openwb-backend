import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import openWB from './entity';
import config from '../config';

export let mariaClient: Connection;

export async function connectMariaDB() {
    try {
        mariaClient = await createConnection({
            type: 'mariadb',
            host: config.MARIADB_URL,
            port: config.MARIADB_PORT,
            username: config.MARIADB_USERNAME,
            password: config.MARIADB_PASSWORD,
            database: 'hausdb',
            entities: [openWB],
            synchronize: true,
            logging: 'all',
        });
    } catch (e: any) {
        throw new Error('MariaDB unable to connect to ' + config.REDISDB_URL); //, {cause: e});
    }
    console.log('Connected to MariaDB at', config.REDISDB_URL);
}

export async function disconnectMariaDB() {
    await mariaClient.close();
    console.log('Disconnected from MariaDB');
}

export default mariaClient;
