import { FastifyPluginCallback } from 'fastify';
import getGlobals from './getGlobals';
import getLadepunkt from './getLadepunkt';
import getLiveValues from './getLiveValues';
import getRFID from './getRFID';
import getVerbrauch from './getVerbrauch';
import getMetrics from './metrics';

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

    server.get('/rfid', async (request, reply) => {
        reply.type('application/json').code(200);
        return await getRFID();
    });

    server.get('/values', async (request, reply) => {
        let values = await getLiveValues();
        reply.type('application/json');
        if (values) {
            reply.code(200);
            return values;
        } else {
            reply.code(404);
            return {
                code: 404,
                message: 'too early',
            };
        }
    });

    server.get('/metrics', async (request, reply) => {
        reply.type('text/plain').code(200);
        return await getMetrics();
    });

    done();
};

export default api;
