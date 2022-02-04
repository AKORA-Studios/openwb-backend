import config from '../config';
import { InfluxDB, WriteApi } from '@influxdata/influxdb-client';

export const influxDB = new InfluxDB({ url: config.INFLUX_URL });
export let influxApi: WriteApi;

export async function connectInfluxDB() {
    try {
        influxApi = influxDB.getWriteApi(config.INFLUX_ORG, config.INFLUX_BUCKET);

        console.log('Connected to InfluxDB at', config.INFLUX_URL);
    } catch (e: any) {
        throw new Error('InfluxDB unable to connect to ' + config.INFLUX_URL); //, {cause: e});
    }
}

export async function disconnectInfluxDB() {
    await influxApi.close();
    console.log('Disconnected from InfluxDB');
}
