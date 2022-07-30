import {
    FastifyInstance,
    FastifyLoggerInstance,
    FastifyReply,
    FastifyRequest,
    FastifySchema,
    RouteOptions,
} from 'fastify';
import { RouteGenericInterface } from 'fastify/types/route';
import server from 'index';
import { Server as HTTPServer, IncomingMessage, ServerResponse, Server } from 'node:http';
import { UserJWTPayload } from './auth';

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

export type MyServer = typeof server;
export type UserRequest = FastifyRequest<
    RouteGenericInterface & { Params: { user: UserJWTPayload } }
>;
export type UserReply = FastifyReply<
    Server,
    IncomingMessage,
    ServerResponse,
    RouteGenericInterface & {
        Params: {
            user: UserJWTPayload;
        };
    },
    unknown
>;
