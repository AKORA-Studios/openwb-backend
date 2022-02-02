import { config } from 'dotenv';

//Load enviroment variables
config();

export default {
    MQTT_URL: process.env.MQTT_URL ?? 'mqtt://localhost:1883',
    MQTT_USER: process.env.MQTT_USER,
    MQTT_PASSWORD: process.env.MQTT_PASSWORD,
    MONGODB_URL: process.env.MONGODB_URL ?? 'mongodb://localhost:27017/',
    MONGODB_ADMIN_USERNAME: process.env.MONGO_INITDB_ROOT_USERNAME,
    MONGODB_ADMIN_PASSWORD: process.env.MONGO_INITDB_ROOT_PASSWORD,
    PORT: process.env.PORT ?? 3000,
    ADDRESS: process.env.NODE_ENV ? '0.0.0.0' : '127.0.0.1',
};
