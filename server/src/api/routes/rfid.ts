import RFIDLog from '@db/models/RFIDLog';
import { UserRequest } from '..';
import { MyServer, UserReply } from '../types';

export const rfidRoute = (server: MyServer) => {
    server.route({
        url: '/rfid',
        method: 'GET',
        preHandler: server.auth([server.verifyJWT]),
        handler: async (req: UserRequest, reply: UserReply) => {
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
                timestamp: json.timestamp.getTime(),
                tagName: json.tagName,
                tagCode: json.tagCode,
            };
        },
    });
};
export default rfidRoute;
