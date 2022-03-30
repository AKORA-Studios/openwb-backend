import { UserRequest } from '..';
import { getGlobals } from '../../lib';
import { MyServer } from '../endpoints';

export const globalsRoute = (server: MyServer) => {
    server.route({
        url: '/globals',
        method: 'GET',
        preHandler: server.auth([server.verifyJWT]),
        handler: async (req: UserRequest, reply) => {
            return await getGlobals();
        },
    });
};
export default globalsRoute;
