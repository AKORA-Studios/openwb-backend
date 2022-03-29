import { FastifyPluginCallback } from 'fastify';
import { UserRequest } from '.';
import LadeLog from '../db/models/Ladelog';
import { getKey } from '../db/redis';
import { getGlobals, getLadelog, getLadepunkt, getLiveValues, getRFID, getVerbrauch } from '../lib';
import { findUser, generateJWT } from './auth';
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

    server.route({
        url: '/ladelog',
        method: 'GET',
        preHandler: server.auth([server.verifyJWT]),
        handler: async (req: UserRequest, reply) => {
            reply.type('application/json').code(200);
            let tagName = req.params.user.admin ? undefined : req.params.user.tagName;
            let limit = 25;
            if ((req.query as any)['limit']) {
                if (isNaN((req.query as any)['limit'])) throw new Error('Invalid Limit');
                limit = Number((req.query as any)['limit']);
            }

            const where = tagName
                ? {
                      tag: tagName,
                  }
                : {};
            const entries = await LadeLog.findAll({
                where,
                limit,
            });

            return {
                log: entries,
            };
        },
    });

    //Authentication
    //
    //
    //
    //
    server.route({
        url: '/@me',
        method: 'GET',
        preHandler: server.auth([server.verifyJWT]),
        handler: async (req: UserRequest, repl) => {
            repl.type('application/json').code(200);
            return req.params.user;
        },
    });

    server.route({
        url: '/login',
        method: 'POST',
        handler: async (req, repl) => {
            const user = await findUser((req.body as any).username, (req.body as any).password);

            if (!user) {
                repl.code(403);
                return { message: 'Invalid Credentials' };
            }

            return await generateJWT(user);
        },
    });
};

export default loadEndpoints;
