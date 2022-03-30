import { UserRequest } from '../..';
import { MyServer } from '../../endpoints';

export const meRoute = (server: MyServer) => {
    server.route({
        url: '/@me',
        method: 'GET',
        preHandler: server.auth([server.verifyJWT]),
        handler: async (req: UserRequest, repl) => {
            repl.type('application/json').code(200);
            return req.params.user;
        },
    });
};
export default meRoute;
