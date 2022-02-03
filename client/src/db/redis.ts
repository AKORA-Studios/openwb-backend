import { createClient } from 'redis';
import config from '../config';

export const redisClient = createClient({
    url: config.REDISDB_URL,
});

redisClient.on('error', (err) => {
    console.log('Redis Client Error', err);
    process.exit(1);
});

export function getKey(key: string) {
    return redisClient.get(key);
}

export async function setKey(key: string, value: any) {
    return redisClient.set(key, value);
}

export async function connectRedisDB() {
    try {
        await redisClient.connect();
    } catch (e: any) {
        throw new Error('RedisDB unable to connect to ' + config.REDISDB_URL); //, {cause: e});
    }
    console.log('Connected to RedisDB at', config.REDISDB_URL);
}

export async function disconnectRedisDB() {
    await redisClient.disconnect();
    console.log('Disconnected from RedisDB');
}

export default redisClient;
