import { UserRequest } from '..';
import { getVerbrauch } from '../../lib';
import { MyServer } from '../endpoints';

export const verbrauchRoute = (server: MyServer) => {
    server.route({
        url: '/verbrauch',
        method: 'GET',
        preHandler: server.auth([server.verifyJWT]),
        handler: async (req: UserRequest, reply) => {
            return await getVerbrauch();
        },
    });
};
export default verbrauchRoute;
