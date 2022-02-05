import { config } from 'dotenv';

//Load enviroment variables
config();

export default {
    MQTT_URL: process.env.MQTT_URL ?? 'mqtt://localhost:1883',
    MQTT_USERNAME: process.env.MQTT_USERNAME,
    MQTT_PASSWORD: process.env.MQTT_PASSWORD,

    MARIADB_URL: process.env.MARIADB_URL!,
    MARIADB_PORT: Number(process.env.MARIADB_PORT!),
    MARIADB_USERNAME: process.env.MARIADB_USERNAME!,
    MARIADB_PASSWORD: process.env.MARIADB_PASSWORD!,

    REDISDB_URL: process.env.REDISDB_URL ?? 'redis://localhost:6379',

    PORT: process.env.PORT ?? 3000,
    ADDRESS: process.env.NODE_ENV ? '0.0.0.0' : '127.0.0.1',
};
