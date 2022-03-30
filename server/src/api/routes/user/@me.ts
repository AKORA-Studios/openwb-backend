import { UserRequest } from '../..';
import { MyServer } from '../../endpoints';
import S from 'fluent-json-schema';
import User from '../../../db/models/User';

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

    const bodyJsonSchema = S.object().prop('password', S.string().required());

    // Note that there is no need to call `.valueOf()`!
    const schema = {
        body: bodyJsonSchema,
    };

    server.route({
        url: '/@me',
        method: 'PATCH',
        schema,
        preHandler: server.auth([server.verifyJWT]),
        handler: async (req: UserRequest, repl) => {
            repl.type('application/json').code(200);

            const user = User.findOne({
                where: {
                    username: req.params.user.username,
                },
            });

            return req.params.user;
        },
    });
};
