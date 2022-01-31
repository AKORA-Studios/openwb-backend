import config from './config';
import Fastify, { fastify } from 'fastify';
import { Units, mqttListener, ready as openWBClientReady } from './openWB';
import { connectMongoDB } from './db';
import { connection as DBConnection } from 'mongoose';

const server = Fastify({
    logger: true,
});

console.log(config);

mqttListener.publish('openWB/set/Lademodus', Units.ChargeMode.SofortLaden);

server.get('/', async (request, reply) => {
    reply.type('application/json').code(200);
    return { hello: 'world' };
});

//fastify.all('/api');

async function start() {
    await connectMongoDB();
    await openWBClientReady;
    server.listen(config.PORT, '0.0.0.0', (err, address) => {
        if (err) throw err;
        console.log(`Server is now listening on ${address}`);
        console.log(server.printRoutes({ commonPrefix: false }));
    });
}

start();

process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    console.log('Closing http server.');
    server.close(async () => {
        console.log('Http server closed.');
        await DBConnection.close();
        console.log('DB Connection closed.');
        await mqttListener.destroy();
        console.log('MQQT Connection closed.');
        process.exit(0);
    });
});
