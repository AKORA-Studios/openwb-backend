import config from './config';
import Fastify from 'fastify';
import { connectMQTTClient, disconnectMQTTClient } from './openWB/client';
import { connectRedisDB, disconnectRedisDB } from './db/redis';
import { connectMariaDB, disconnectMariaDB } from './db/mariadb';
import api from './api';
//import { register } from './api/metrics';

const server = Fastify({
    logger: {
        level: 'error',
    },
});

//console.log(config);

server.get('/', async (request, reply) => {
    reply.type('application/json').code(200);
    return { hello: 'world' };
});

server.register(api, { prefix: '/api' });

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

export function stop(reason = 'stopped') {
    console.log(`Stopping Server at ${new Date()}`);
    console.log(` - Reason:`, reason);
    server.close(async () => {
        console.log(' - Http server closed');
        await disconnectMQTTClient();
        await disconnectMariaDB();
        await disconnectRedisDB();
        if (config.PROD) console.log('\n\n'); //More readable logs
        process.exit(0);
    });
}

process.on('SIGTERM', async () => {
    console.info('SIGTERM signal received.');
    stop('SIGTERM');
});
