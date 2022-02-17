import { writeFile } from 'fs/promises';
import { Sequelize, Model, DataTypes, DataType } from 'sequelize';
import config from '../../config';
import redisClient, { getKey } from '../redis';

const sequelize = new Sequelize({
    host: config.MARIADB_URL,
    port: config.MARIADB_PORT,
    dialect: 'mariadb',
    database: 'hausdb',
    username: config.MARIADB_USERNAME,
    password: config.MARIADB_PASSWORD,
});

//Connecting
export async function connectTimeSeries() {
    try {
        await sequelize.authenticate();
        await initModel();
        setInterval(async () => {
            await savePoint();
        }, 1000 * 60 * 5);
    } catch (e: any) {
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

//Create Model and sync to database
export async function initModel() {
    let keys = await redisClient.keys('*');
    let schema: { [key: string]: DataType } = {};

    for (let key of keys) {
        let val = await getKey(key);
        let dtype: DataType = DataTypes.STRING;
        if (typeof val === 'number') dtype = DataTypes.FLOAT;
        schema[key] = dtype;

        if (key === 'openWB/system/lastRfId') {
            schema['openWB/system/lastRfId'] = DataTypes.INTEGER;
            schema['openWB/system/lastRfIdDate'] = DataTypes.DATE;
        }

        if (key === 'openWB/system/Timestamp') {
            schema['wb_timestamp'] = DataTypes.DATE;
        }
    }

    Timeseries.init(schema, { sequelize, modelName: 'openwb_keys' });
    await sequelize.sync();
}

//Save single point to database
export async function savePoint() {
    await sequelize.sync();

    let keys = await redisClient.keys('*');
    let data: { [key: string]: any } = {};

    for (let key of keys) {
        let val = await getKey(key);
        data[key] = val;

        if (key === 'openWB/system/lastRfId') {
            const arr = (val + '').split(',');
            data['openWB/system/lastRfId'] = Number(arr[0]);
            data['openWB/system/lastRfIdDate'] = new Date(Number(arr[1]) * 1000);
        }

        if (key === 'openWB/system/Timestamp') {
            data['wb_timestamp'] = new Date((val as number) * 1000);
        }
    }

    await writeFile('/app/test/last_point.txt', JSON.stringify(data, null, 4));

    const point = await Timeseries.create(data);
    console.log(point.toJSON());
}
