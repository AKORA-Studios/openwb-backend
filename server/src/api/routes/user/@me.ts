import { UserRequest } from '../..';
import { MyServer } from '../../types';
import User from '@db/models/User';
import { hash, UserJWTPayload } from '../../auth';
import S from 'fluent-json-schema';

export default (server: MyServer) => {
    server.route({
        url: '/@me',
        method: 'GET',
        preHandler: server.auth([server.verifyJWT]),
        handler: async (req: UserRequest, repl) => {
            repl.type('application/json').code(200);
            return req.params.user;
        },
    });

    server.route<{
        Body: {
            password: string;
        };
        Params: {
            user: UserJWTPayload;
        };
    }>({
        url: '/@me',
        method: 'PATCH',
        schema: {
            body: S.object().prop('password', S.string().required()),
        },
        preHandler: server.auth([server.verifyJWT]),
        handler: async (req, repl) => {
            const user = await User.findOne({
                where: {
                    username: req.params.user.username,
                },
            });
            if (!user) throw new Error('User not found');

            user.password = hash(req.body.password);
            await user.save();

            repl.type('application/json').code(200);
            return req.params.user;
        },
    });
};
