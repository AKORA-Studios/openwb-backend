import config from './config';
import './mqtt/client';
import Fastify from 'fastify';

const fastify = Fastify({
    logger: true,
});

fastify.get('/', async (request, reply) => {
    reply.type('application/json').code(200);
    return { hello: 'world' };
});

fastify.listen(config.PORT, '0.0.0.0', (err, address) => {
    if (err) throw err;
    console.log(`Server is now listening on ${address}`);
});
