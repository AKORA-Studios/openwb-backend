import { MyServer } from '../../types';
import User from '@db/models/User';
import { hash } from '../../auth';
import S from 'fluent-json-schema';

export default (server: MyServer) => {
    const bodyJsonSchema = S.object()
        .prop('username', S.string().required())
        .prop('password', S.string())
        .prop('admin', S.boolean());

    server.route<{
        Body: {
            username: string;
            password?: string;
            admin?: boolean;
        };
    }>({
        url: '/',
        method: 'PATCH',
        schema: {
            body: bodyJsonSchema,
        },
        preHandler: server.auth([server.verifyJWT, server.verifyAdmin]),
        handler: async (req, repl) => {
            const { body } = req;
            const user = await User.findOne({
                where: {
                    username: body.username,
                },
            });
            if (!user) throw new Error('User not found');

            if (body.admin) user.admin = body.admin;
            if (body.password) user.password = hash(body.password);

            await user.save();

            repl.type('application/json').code(200);
            return {
                username: body.username,
                admin: user.admin,
                tagName: user.tagName,
            };
        },
    });
};
