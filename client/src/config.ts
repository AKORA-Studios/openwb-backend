import { config } from 'dotenv';

//Load enviroment variables
config();

export default {
    MQTT_URL: process.env.MQTT_URL ?? 'mqtt://localhost:1883',
    MQTT_USERNAME: process.env.MQTT_USERNAME,
    MQTT_PASSWORD: process.env.MQTT_PASSWORD,
    INFLUX_URL: process.env.INFLUX_URL!,
    INFLUX_ORG: process.env.DOCKER_INFLUXDB_INIT_ORG!,
    INFLUX_BUCKET: process.env.DOCKER_INFLUXDB_INIT_BUCKET!,
    REDISDB_URL: process.env.REDISDB_URL ?? 'redis://localhost:6379',
    PORT: process.env.PORT ?? 3000,
    ADDRESS: process.env.NODE_ENV ? '0.0.0.0' : '127.0.0.1',
};
