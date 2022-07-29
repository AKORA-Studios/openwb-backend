import fastify from 'fastify';

declare module 'fastify' {
    export interface FastifyInstance {
        verifyJWT(): void;
        verifyAdmin(): void;
    }
}
