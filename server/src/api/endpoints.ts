import {
    FastifyInstance,
    FastifyLoggerInstance,
    FastifyPluginCallback,
    FastifySchema,
    RouteOptions,
} from 'fastify';
import { RouteGenericInterface } from 'fastify/types/route';
import { Server as HTTPServer, IncomingMessage, ServerResponse } from 'node:http';
import { UserJWTPayload } from './auth';
import loadRoutes from './routes';

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
    loadRoutes(server);
};

export default loadEndpoints;
