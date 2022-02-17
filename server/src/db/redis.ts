import { writeFile } from 'fs/promises';
import { createClient } from 'redis';
import config from '../config';

export const redisClient = createClient({
    url: config.REDISDB_URL,
});

redisClient.on('error', (err) => {
    console.log('Redis Client Error', err);
    process.exit(1);
});

export async function getKey(key: string) {
    let str = await redisClient.get(key);

    let isNumber = !isNaN(Number(str)),
        val: string | number | null = str;

    if (isNumber) val = Number(str);

    return val;
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

    let keys = (await redisClient.keys('*')).sort();
    let str = '';
    for (let key of keys) {
        let val = await getKey(key);
        str += `${key.padEnd(55)} - ${JSON.stringify(val)}\n`;
    }

    await writeFile('/app/test/test.txt', str);
}

export async function disconnectRedisDB() {
    await redisClient.disconnect();
    console.log('Disconnected from RedisDB');
}

export default redisClient;
