import config from './config';
import Fastify from 'fastify';
import { Units, mqttListener, ready as openWBClientReady } from './openWB';
import { connectMongoDB } from './db';

const fastify = Fastify({
    logger: true,
});

console.log(config);

mqttListener.publish('openWB/set/Lademodus', Units.ChargeMode.SofortLaden);

fastify.get('/', async (request, reply) => {
    reply.type('application/json').code(200);
    return { hello: 'world' };
});

async function start() {
    await connectMongoDB();
    await openWBClientReady;
    fastify.listen(config.PORT, '0.0.0.0', (err, address) => {
        if (err) throw err;
        console.log(`Server is now listening on ${address}`);
    });
}

start();
