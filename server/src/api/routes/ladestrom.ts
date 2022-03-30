import { UserRequest } from '..';
import { getKey } from '../../db/redis';
import { MyServer } from '../endpoints';

export const ladestromRoute = (server: MyServer) => {
    server.route({
        url: '/ladestrom',
        method: 'GET',
        preHandler: server.auth([server.verifyJWT]),
        handler: async (req: UserRequest, reply) => {
            return {
                min: await getKey('openWB/config/get/pv/lp/1/minCurrent '),
                max: await getKey('openWB/config/get/global/maxEVSECurrentAllowed'),
            };
        },
    });
};
export default ladestromRoute;
