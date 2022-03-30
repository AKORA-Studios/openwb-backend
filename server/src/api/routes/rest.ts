import axios from 'axios';
import config from '../../config';
import { MyServer } from '../endpoints';

export const restRoute = (server: MyServer) =>
    server.route({
        url: '/rest',
        method: 'GET',
        preHandler: server.auth([server.verifyJWT]),
        handler: async (request, reply) => {
            reply.type('application/json').code(200);
            const data = (await axios(config.OPENWB_URL + '/openWB/web/api.php?get=all')).data;

            for (let key in data) {
                let isNumber = !isNaN(Number(data[key]));

                if (isNumber) data[key] = Number(data[key]);
            }

            return data;
        },
    });

export default restRoute;
