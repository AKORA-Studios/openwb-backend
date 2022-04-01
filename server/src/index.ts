import config from './config';
import Fastify from 'fastify';
import fastifyAuth from 'fastify-auth';
import { connectMQTTClient, disconnectMQTTClient } from './openWB/client';
import { connectRedisDB, disconnectRedisDB } from './db/redis';
import { connectMariaDB, disconnectMariaDB } from './db/mariadb';

export const server = Fastify({
    logger: {
        level: 'error',
    },
}).register(fastifyAuth);
export default server;

//Define Endpoints
server.get('/', async (request, reply) => {
    reply.type('application/json').code(200);
    return { hello: 'world' };
});

import './api';

async function start() {
    console.log(`Starting Server at ${new Date()}`);
    try {
        await connectRedisDB();
        await connectMariaDB();
        await connectMQTTClient();
        //await register();
        server.listen(config.PORT, config.ADDRESS, (err, address) => {
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

function sleep(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
export function stop(reason = 'stopped') {
    console.log(`Stopping Server at ${new Date()}`);
    console.log(` - Reason:`, reason);
    server.close(async () => {
        console.log(' - Http server closed');
        await Promise.race([
            (async () => {
                //Stop all services
                await disconnectMQTTClient();
                await disconnectMariaDB();
                await disconnectRedisDB();
            })(),
            (async () => {
                sleep(5000); //Wait 5 seconds
                console.log(' - Timed out after 5 seconds');
            })(),
        ]);

        if (config.PROD) console.log('\n\n'); //More readable logs
        process.exit(0);
    });
}

process.on('SIGTERM', async () => {
    console.info('SIGTERM signal received.');
    stop('SIGTERM');
});
