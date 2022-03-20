import { FastifyPluginCallback } from 'fastify';
import { getKey } from '../db/redis';
import { getGlobals, getLadelog, getLadepunkt, getLiveValues, getRFID, getVerbrauch } from '../lib';
import { keyRoute, lademodusRoute, lademodusSetRoute, restRoute } from './routes';

export const loadEndpoints: FastifyPluginCallback = (server) => {
    function userRoute(url: string, func: () => Promise<any>) {
        server.route({
            url,
            method: 'GET',
            preHandler: server.auth([server.verifyJWT]),
            handler: async (request, reply) => {
                reply.type('application/json').code(200);
                return await func();
            },
        });
    }

    userRoute('/ladepunkt', getLadepunkt);
    userRoute('/verbrauch', getVerbrauch);
    userRoute('/globals', getGlobals);
    userRoute('/rfid', getRFID);
    userRoute('/values', getLiveValues);
    userRoute('/ladestrom', async () => ({
        min: await getKey('openWB/config/get/pv/lp/1/minCurrent '),
        max: await getKey('openWB/config/get/global/maxEVSECurrentAllowed'),
    }));

    server.route(keyRoute(server));
    server.route(restRoute(server));
    server.route(lademodusRoute(server));
    server.route(lademodusSetRoute(server));

    server.get('/ladelog', async (request, reply) => {
        reply.type('application/json').code(200);

        return {
            log: await getLadelog(),
        };
    });
};

export default loadEndpoints;
