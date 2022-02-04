import config from '../config';
import { ClientOptions, InfluxDB, WriteApi } from '@influxdata/influxdb-client';

const username = config.INFLUXDB_ADMIN_USER;
const password = config.INFLUXDB_ADMIN_PASSWORD;
const token = `${username}:${password}`;

const database = 'graph';
const retentionPolicy = 'autogen';

const bucket = `${database}/${retentionPolicy}` ?? config.INFLUX_BUCKET;

const clientOptions: ClientOptions = {
    url: config.INFLUX_URL,
    token,
};

export const influxDB = new InfluxDB(clientOptions);
export let influxApi: WriteApi;

export async function connectInfluxDB() {
    try {
        influxApi = influxDB.getWriteApi('', bucket);

        console.log('Connected to InfluxDB at', config.INFLUX_URL);
    } catch (e: any) {
        throw new Error('InfluxDB unable to connect to ' + config.INFLUX_URL); //, {cause: e});
    }
}

export async function disconnectInfluxDB() {
    await influxApi.close();
    console.log('Disconnected from InfluxDB');
}
