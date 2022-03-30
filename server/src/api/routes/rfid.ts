import { UserRequest } from '..';
import { getRFID } from '../../lib';
import { MyServer } from '../endpoints';

export const rfidRoute = (server: MyServer) => {
    server.route({
        url: '/rfid',
        method: 'GET',
        preHandler: server.auth([server.verifyJWT]),
        handler: async (req: UserRequest, reply) => {
            return await getRFID();
        },
    });
};
export default rfidRoute;
