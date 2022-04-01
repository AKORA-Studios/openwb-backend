import { UserRequest } from '..';
import { getLiveValues } from '../../lib';
import { MyServer } from '../types';

export const valuesRoute = (server: MyServer) => {
    server.route({
        url: '/values',
        method: 'GET',
        preHandler: server.auth([server.verifyJWT]),
        handler: async (req: UserRequest, reply) => {
            return await getLiveValues();
        },
    });
};
export default valuesRoute;
