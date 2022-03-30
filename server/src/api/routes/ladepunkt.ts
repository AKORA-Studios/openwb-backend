import { UserRequest } from '..';
import { getLadepunkt } from '../../lib';
import { MyServer } from '../endpoints';

export const ladepunktRoute = (server: MyServer) => {
    server.route({
        url: '/ladepunkt',
        method: 'GET',
        preHandler: server.auth([server.verifyJWT]),
        handler: async (req: UserRequest, reply) => {
            return await getLadepunkt();
        },
    });
};
export default ladepunktRoute;
