import { FastifyReply } from 'fastify';
import server from '..';
import { validateJWT } from './auth';
import loadRoutes from './routes';
import { UserRequest } from './types';

export * from './types';

server.register(
    (server, opts, done) => {
        server.decorate(
            'verifyJWT',
            async function (req: UserRequest, rpl: FastifyReply, done: any) {
                //verifyToken gives userId in case of successful decoding
                //gives err msg in case of error
                if (!req.headers.authorization) {
                    const message = 'Missing authorization header';
                    rpl.type('application/json').code(403).send({
                        message,
                    });
                    return new Error(message);
                }

                try {
                    const user = await validateJWT(req.headers.authorization!);
                    req.params.user = user;
                } catch (e) {
                    console.log('Failed login attempt by', req.ip);
                    const message = 'Invalid token';

                    rpl.type('application/json').code(403).send({
                        message,
                    });
                    return new Error(message);
                }

                done();
            }
        );

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

        loadRoutes(server);

        done();
    },
    { prefix: '/api' }
);
