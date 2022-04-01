import RFIDLog from '@models/RFIDLog';
import { UserRequest } from '..';
import { MyServer } from '../endpoints';

export const rfidRoute = (server: MyServer) => {
    server.route({
        url: '/rfid',
        method: 'GET',
        preHandler: server.auth([server.verifyJWT]),
        handler: async (req: UserRequest, reply) => {
            reply.type('application/json');

            const entry = await RFIDLog.findOne({
                order: [['timestamp', 'DESC']],
            });

            if (!entry) {
                reply.code(404);
                return {
                    code: 404,
                    message: 'No entr found',
                };
            }

            const json = entry.toJSON();
            reply.code(200);
            return {
                timestamp: json.timestamp,
                tagName: json.tagName,
                tagCode: json.tagCode,
            };
        },
    });
};
export default rfidRoute;
