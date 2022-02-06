import config from './config';
import Fastify from 'fastify';
import { connectMQTTClient, disconnectMQTTClient } from './openWB/client';
import { connectRedisDB, disconnectRedisDB } from './db/redis';
import { connectMariaDB, disconnectMariaDB } from './db/mariadb';
import api from './api';

const server = Fastify({
    logger: true,
});

console.log(config);

server.get('/', async (request, reply) => {
    reply.type('application/json').code(200);
    return { hello: 'world' };
});

server.register(api, { prefix: '/api' });

//fastify.all('/api');

async function start() {
    try {
        await connectRedisDB();
        await connectMariaDB();
        await connectMQTTClient();
        server.listen(config.PORT, '0.0.0.0', (err, address) => {
            if (err) throw err;
            console.log(`Server is now listening on ${address}`);
            console.log(server.printRoutes({ commonPrefix: false }));
        });
    } catch (e) {
        console.log('Error while connecting');
        console.log(e);
        process.exit(1);
    }
}
start();

export function stop() {
    console.log('Closing http server.');
    server.close(async () => {
        console.log('Http server closed.');
        await disconnectMQTTClient();
        await disconnectMariaDB();
        await disconnectRedisDB();
        process.exit(0);
    });
}

process.on('SIGTERM', async () => {
    console.info('SIGTERM signal received.');
    stop();
});