import config from './config';
import Fastify from 'fastify';

const fastify = Fastify({
    logger: true,
});

fastify.get('/', async (request, reply) => {
    reply.type('application/json').code(200);
    return { hello: 'world' };
});

fastify.listen(config.PORT, (err, address) => {
    if (err) throw err;
    // Server is now listening on ${address}
});
