import { FastifyReply, FastifyRequest } from 'fastify';
import server from '..';
import loadEndpoints from './endpoints';
import { SignJWT } from 'jose';
import config from '../config';

server.register(
    (server, opts, done) => {
        server.decorate('verifyJWT', async function (req: FastifyRequest, rpl: FastifyReply, done: any) {
            //verifyToken gives userId in case of successful decoding
            //gives err msg in case of error
            const jwt = await new SignJWT({ 'urn:example:claim': true })
                .setProtectedHeader({ alg: 'ES256' })
                .setIssuedAt()
                .setExpirationTime('2h')
                .sign(Buffer.from(config.JWT_SECRET));

            console.log(jwt);

            console.log(req.params);
            (req.params as any)['user'] = '';
            done();
        });

        server.decorate('verifyAdmin', function (req: FastifyRequest, rpl: FastifyReply, done: any) {
            //verifyToken gives userId in case of successful decoding
            //gives err msg in case of error
            done();
        });

        server.route({
            method: 'GET',
            url: '/as',
            handler: () => {},
        });

        server.addHook('preValidation', (req, reply, done) => {
            done();
        });

        loadEndpoints(server, opts, done);

        done();
    },
    { prefix: '/api' }
);
