import fastify from 'fastify';
import { ServerResponse, IncomingMessage, Server } from 'http';

declare module 'fastify' {
    export interface FastifyInstance<
        HttpServer = Server,
        HttpRequest = IncomingMessage,
        HttpResponse = ServerResponse
    > {
        verifyJWT(): void;
        verifyAdmin(): void;
    }
}
