import { FastifyReply, FastifyRequest } from 'fastify';
import server from '..';
import loadEndpoints from './endpoints';
import { RouteGenericInterface } from 'fastify/types/route';
import User from '../db/models/User';
import { UserJWTPayload, validateJWT } from './auth';

export type UserRequest = FastifyRequest<RouteGenericInterface & { Params: { user: UserJWTPayload } }>;

server.register(
    (server, opts, done) => {
        server.decorate('verifyJWT', async function (req: UserRequest, rpl: FastifyReply, done: any) {
            //verifyToken gives userId in case of successful decoding
            //gives err msg in case of error

            if (!req.headers.authorization) {
                rpl.type('application/json').code(403).send({
                    message: 'Missing authorization header',
                });
                done(new Error('Missing authorization header'));
            }

            try {
                const user = await validateJWT(req.headers.authorization!);
                req.params.user = user;
            } catch (e) {
                console.log(e);
                rpl.type('application/json').code(403).send({
                    message: 'Invalid token',
                });
                done(new Error('Invalid Token'));
            }

            done();
        });

        server.decorate('verifyAdmin', function (req: UserRequest, rpl: FastifyReply, done: any) {
            //verifyToken gives userId in case of successful decoding
            //gives err msg in case of error
            if (!req.params.user.admin) {
                rpl.type('application/json').code(403).send({
                    message: 'Missing Permissions',
                });
                done(new Error('Missing Permissions'));
            }

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
