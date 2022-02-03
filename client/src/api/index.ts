import { FastifyPluginCallback } from 'fastify';
import getGlobals from './getGlobals';
import getLadepunkt from './getLadepunkt';
import getLiveValues from './getLiveValues';
import getVerbrauch from './getVerbrauch';

export const api: FastifyPluginCallback = function (server, opts, done) {
    server.get('/ladepunkt', async (request, reply) => {
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

    server.get('/livevalues', async (request, reply) => {
        reply.type('application/json').code(200);
        return await getLiveValues();
    });

    done();
};

export default api;
