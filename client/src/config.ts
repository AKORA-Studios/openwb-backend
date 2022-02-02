import { config } from 'dotenv';

//Load enviroment variables
config();

export default {
    MQTT_URL: process.env.MQTT_URL ?? 'mqtt://localhost:1883',
    MQTT_USERNAME: process.env.MQTT_USERNAME,
    MQTT_PASSWORD: process.env.MQTT_PASSWORD,
    MONGODB_URL: process.env.MONGODB_URL ?? 'mongodb://localhost:27017/',
    MONGODB_ADMIN_USERNAME: process.env.MONGO_INITDB_ROOT_USERNAME,
    MONGODB_ADMIN_PASSWORD: process.env.MONGO_INITDB_ROOT_PASSWORD,
    REDISDB_URL: process.env.REDISDB_URL ?? 'redis://localhost:6379',
    PORT: process.env.PORT ?? 3000,
    ADDRESS: process.env.NODE_ENV ? '0.0.0.0' : '127.0.0.1',
};
