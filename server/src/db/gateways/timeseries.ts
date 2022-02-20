import { writeFile } from 'fs/promises';
import { Sequelize, Model, DataTypes, DataType } from 'sequelize';
import { carID } from '../../api/getRFID';
import config from '../../config';
import redisClient, { getKey } from '../redis';

const sequelize = new Sequelize({
    host: config.MARIADB_URL,
    port: config.MARIADB_PORT,
    dialect: 'mariadb',
    database: 'hausdb',
    username: config.MARIADB_USERNAME,
    password: config.MARIADB_PASSWORD,
    logging: false,
});

/** All important keys that need to be stored in the DB */
let keys: string[] = [];

//Connecting
export async function connectTimeSeries() {
    try {
        await sequelize.authenticate();
        await initModel();
        await savePoint();
        setInterval(async () => {
            await savePoint();
        }, 1000 * 60 * 1); //Every minute
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

//
//    Model Creation
//
//

//Basic Model
class Timeseries extends Model {}

/** Sort out all unimportant keys */
function filterKeys(arr: string[]): string[] {
    return arr
        .filter((s) => !s.includes('SmartHome'))
        .filter((s) => !s.includes('config'))
        .filter((s) => !s.includes('set'))
        .filter((s) => !s.includes('graph'))
        .filter((s) => !s.includes('Graph'))
        .filter((s) => !/^openWB\/lp\/[2-8]/.test(s));
}

//Create Model and sync to database
export async function initModel() {
    keys = filterKeys(await redisClient.keys('*'));
    let schema: { [key: string]: DataType } = {};

    for (let key of keys) {
        let val = await getKey(key);
        let dtype: DataType = DataTypes.STRING;
        if (typeof val === 'number') dtype = DataTypes.FLOAT;

        if (key === 'openWB/system/lastRfId') {
            schema['openWB_system_lastRfId'] = DataTypes.STRING;
            schema['openWB_system_lastRfIdCode'] = DataTypes.INTEGER;
            schema['openWB_system_lastRfIdDate'] = DataTypes.DATE;
        } else if (key === 'openWB/system/Timestamp') {
            schema['wb_timestamp'] = DataTypes.DATE;
        } else {
            schema[key.replaceAll('/', '_')] = dtype;
        }
    }

    Timeseries.init(schema, { sequelize, modelName: 'openwb_keys' });
    await sequelize.sync();
}

//Save single point to database
export async function savePoint() {
    await sequelize.sync();

    let data: { [key: string]: any } = {};

    for (let key of keys) {
        let val = await getKey(key);

        if (key === 'openWB/system/lastRfId') {
            const arr = (val + '').split(','),
                name = carID[arr[0] as any] ?? '@',
                code = name?.charCodeAt(0) - 65,
                date = arr[1] ? new Date(Number(arr[1]) * 1000) : null;
            data['openWB_system_lastRfId'] = name;
            data['openWB_system_lastRfIdCode'] = code;
            data['openWB_system_lastRfIdDate'] = new Date(Number(arr[1]) * 1000);
        } else if (key === 'openWB/system/Timestamp') {
            data['wb_timestamp'] = new Date((val as number) * 1000);
        } else {
            data[key.replaceAll('/', '_')] = val;
        }
    }

    await writeFile('/app/test/last_point.txt', JSON.stringify(data, null, 4));

    await Timeseries.create(data);
}
