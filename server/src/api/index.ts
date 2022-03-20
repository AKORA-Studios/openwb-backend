import { FastifyReply, FastifyRequest } from 'fastify';
import server from '..';
import loadEndpoints from './endpoints';

server.register(
    (server, opts, done) => {
        server.decorate('verifyJWT', function (req: FastifyRequest, rpl: FastifyReply, done: any) {
            //verifyToken gives userId in case of successful decoding
            //gives err msg in case of error
            console.log(req.params);
            (req.params as any)['user'] = '';
        });

        server.decorate('verifyAdmin', function (req: FastifyRequest, rpl: FastifyReply, done: any) {
            //verifyToken gives userId in case of successful decoding
            //gives err msg in case of error
        });

        server.route({
            method: 'GET',
            url: '/as',
            handler: () => {},
        });
        server.register((server, opts, done) => {});
        server.addHook('preValidation', (req, reply, done) => {
            done();
        });

        loadEndpoints(server, opts, done);

        done();
    },
    { prefix: '/api' }
);
