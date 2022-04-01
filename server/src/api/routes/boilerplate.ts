import { UserRequest } from '..';
import { MyServer } from '../types';

export const keyRoute = (server: MyServer) => {
    server.route({
        url: '/ladelog',
        method: 'GET',
        preHandler: server.auth([server.verifyJWT]),
        handler: async (req: UserRequest, reply) => {},
    });
};
export default keyRoute;
