import config from './config';
import mqttListener from './openWB/client';
import Fastify from 'fastify';
import { Units } from 'openWB/topics';

const fastify = Fastify({
    logger: true,
});

mqttListener.publish('openWB/set/Lademodus', Units.ChargeMode.SofortLaden);

fastify.get('/', async (request, reply) => {
    reply.type('application/json').code(200);
    return { hello: 'world' };
});

fastify.listen(config.PORT, '0.0.0.0', (err, address) => {
    if (err) throw err;
    console.log(`Server is now listening on ${address}`);
});
