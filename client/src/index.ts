import config from './config';
import Fastify from 'fastify';
import { Units, mqttListener, ready as openWBClientReady } from './openWB';
import { connectMongoDB } from './db';

const server = Fastify({
    logger: true,
});

console.log(config);

mqttListener.publish('openWB/set/Lademodus', Units.ChargeMode.SofortLaden);

server.get('/', async (request, reply) => {
    reply.type('application/json').code(200);
    return { hello: 'world' };
});

server.use;

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
