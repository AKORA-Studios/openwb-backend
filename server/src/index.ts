import 'module-alias/register';
import config from './config';
import { fastify } from 'fastify';
import fastifyAuth from '@fastify/auth';
import socketIOPlugin from 'fastify-socket.io';
import { connectMQTTClient, disconnectMQTTClient } from './openWB/client';
import { connectRedisDB, disconnectRedisDB } from '@db/redis';
import { connectMariaDB, disconnectMariaDB } from '@db/mariadb';

import './types/fastify';

export const server = fastify({
    logger: {
        level: 'error',
    },
})
    .register(fastifyAuth)
    .register(socketIOPlugin);

export default server;

//Define Endpoints
server.get('/', async (request, reply) => {
    reply.type('application/json').code(200);
    return { hello: 'world' };
});

import './api';
import { setupSocketIO } from 'api/socket';
import { Server } from 'socket.io';

async function start() {
    console.log(`Starting Server at ${new Date()}`);
    try {
        await connectRedisDB();
        await connectMariaDB();
        await connectMQTTClient();

        let address = await server.listen({
            port: config.PORT,
            host: config.ADDRESS,
        });

        console.log(`Server is now listening on ${address}`);
        console.log(server.printRoutes({ commonPrefix: false }));

        setupSocketIO();
        console.log(`WebSocket ready`);
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
                await sleep(5000); //Wait 5 seconds
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
