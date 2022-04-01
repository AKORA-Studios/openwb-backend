import { UserRequest } from '../..';
import User from '@db/models/User';
import { MyServer } from '../../types';

export default (server: MyServer) => {
    server.route({
        url: '/all',
        method: 'GET',
        preHandler: server.auth([server.verifyJWT, server.verifyAdmin]),
        handler: async (req: UserRequest, repl) => {
            repl.type('application/json').code(200);
            return (await User.findAll()).map((u) => ({
                username: u.username,
                tagName: u.tagName,
                admin: u.admin,
            }));
        },
    });
};
