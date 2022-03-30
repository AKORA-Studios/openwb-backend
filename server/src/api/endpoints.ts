import {
    FastifyInstance,
    FastifyLoggerInstance,
    FastifyPluginCallback,
    FastifySchema,
    RouteOptions,
} from 'fastify';
import { RouteGenericInterface } from 'fastify/types/route';
import { Server as HTTPServer, IncomingMessage, ServerResponse } from 'node:http';
import { UserRequest } from '.';
import LadeLog from '../db/models/Ladelog';
import { getKey } from '../db/redis';
import { getGlobals, getLadelog, getLadepunkt, getLiveValues, getRFID, getVerbrauch } from '../lib';
import { findUser, generateJWT, UserJWTPayload } from './auth';
import { keyRoute, lademodusRoute, restRoute } from './routes';

export type RouteType = RouteOptions<
    HTTPServer,
    IncomingMessage,
    ServerResponse,
    RouteGenericInterface & {
        Params: {
            user: UserJWTPayload;
        };
    },
    unknown,
    FastifySchema
>;

export type MyServer = FastifyInstance<
    HTTPServer,
    IncomingMessage,
    ServerResponse,
    FastifyLoggerInstance,
    HTTPServer,
    IncomingMessage,
    ServerResponse
>;

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

    keyRoute(server);
    restRoute(server);
    lademodusRoute(server);

    

    //Authentication
    //
    //
    //
    //
    

    
};

export default loadEndpoints;
