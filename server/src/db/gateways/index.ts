import { writeFile } from 'fs/promises';
import { Sequelize, Model, DataTypes, DataType } from 'sequelize';
import { carID } from '../../api/getRFID';
import config from '../../config';
import redisClient, { getKey } from '../redis';

export const sequelize = new Sequelize({
    host: config.MARIADB_URL,
    port: config.MARIADB_PORT,
    dialect: 'mariadb',
    database: 'openwb',
    username: config.MARIADB_USERNAME,
    password: config.MARIADB_PASSWORD,
    logging: false,
});
export default sequelize;

/** All important keys that need to be stored in the DB */
let keys: string[] = [];

//Connecting
export async function connectTimeSeries() {
    try {
        await sequelize.authenticate();

        setInterval(async () => {}, 1000 * 60 * 1); //Every minute
    } catch (e: any) {
        console.error(e);
        throw new Error('(TSDB) MariaDB unable to connect to ' + config.MARIADB_URL); //, {cause: e});
    }
    console.log('(TSDB) Connected to MariaDB at', config.MARIADB_URL);
}

//Disconnecting
export async function disconnectTimeSeries() {
    await sequelize.close();
    console.log('(TSDB) Disconnected from MariaDB');
}
