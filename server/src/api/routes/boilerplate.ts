import { UserRequest } from '..';
import { MyServer } from '../endpoints';

export const keyRoute = (server: MyServer) => {
    server.route({
        url: '/ladelog',
        method: 'GET',
        preHandler: server.auth([server.verifyJWT]),
        handler: async (req: UserRequest, reply) => {},
    });
};
