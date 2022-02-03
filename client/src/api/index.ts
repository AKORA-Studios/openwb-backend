import { FastifyPluginCallback } from 'fastify';
import getGlobals from './getGlobals';
import getLadepunkt from './getLadepunkt';
import getVerbrauch from './getVerbrauch';

export const api: FastifyPluginCallback = function (server, opts, done) {
    server.get('/ladepunkte', async (request, reply) => {
        reply.type('application/json').code(200);
        return await getLadepunkt();
    });

    server.get('/verbrauch', async (request, reply) => {
        reply.type('application/json').code(200);
        return await getVerbrauch();
    });

    server.get('/globals', async (request, reply) => {
        reply.type('application/json').code(200);
        return await getGlobals();
    });

    done();
};

export default api;
