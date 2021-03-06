import { Sequelize } from 'sequelize';
import config from '../config';

export const sequelize = new Sequelize({
    host: config.MARIADB_URL,
    port: config.MARIADB_PORT,
    dialect: 'mariadb',
    database: 'openwb',
    username: config.MARIADB_USERNAME,
    password: config.MARIADB_PASSWORD,
    logging: (sql, timing) => {
        //console.log(`Took ${timing}ms for ${sql.slice(0, 500)}...`);
    },
    benchmark: true,
});
export default sequelize;

import GraphValues from './models/GraphValues';
import LadeLog from './models/Ladelog';
import RFIDLog from './models/RFIDLog';
import User from './models/User';

//Connecting
export async function connectMariaDB() {
    try {
        await sequelize.authenticate();
        // Sync Models with database
        await RFIDLog.sync({ alter: !config.PROD });
        await GraphValues.sync({ alter: !config.PROD });
        await User.sync({ alter: !config.PROD });
        await LadeLog.sync({ alter: !config.PROD });
    } catch (e: any) {
        console.error(e);
        throw new Error('MariaDB unable to connect to ' + config.MARIADB_URL); //, {cause: e});
    }
    console.log(' - Connected to MariaDB at', config.MARIADB_URL);
}

//Disconnecting
export async function disconnectMariaDB() {
    await sequelize.close();
    console.log(' - Disconnected from MariaDB');
}
