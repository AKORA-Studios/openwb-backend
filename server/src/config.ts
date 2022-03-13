import { config } from 'dotenv';

//Load enviroment variables
config();

const isDev = process.env.NODE_ENV !== 'production';

export default {
    MQTT_URL: process.env.MQTT_URL!,
    MQTT_USERNAME: process.env.MQTT_USERNAME!,
    MQTT_PASSWORD: process.env.MQTT_PASSWORD!,

    MARIADB_URL: process.env.MARIADB_URL!,
    MARIADB_PORT: Number(process.env.MARIADB_PORT!),
    MARIADB_USERNAME: process.env.MARIADB_USERNAME!,
    MARIADB_PASSWORD: process.env.MARIADB_PASSWORD!,

    REDISDB_URL: process.env.REDISDB_URL!,

    OPENWB_URL: process.env.OPENWB_URL!,

    PORT: process.env.PORT ?? 3000,
    ADDRESS: isDev ? '127.0.0.1' : '0.0.0.0',

    NODE_ENV: process.env.NODE_ENV,
    DEV: isDev,
    PROD: !isDev,
};
