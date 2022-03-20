import axios from 'axios';
import config from '../../config';
import { RouteOptions } from 'fastify';
import server from '../..';

export const lademodusSetRoute = {
    url: '/lademodus/:modus',
    method: 'POST',
    preHandler: server.auth([server.verifyJWT, server.verifyAdmin]),
    handler: async (request, reply) => {
        const { modus } = request.params as { modus: string };
        const modes = ['jetzt', 'minundpv', 'pvuberschuss', 'stop', 'standby'];

        reply.type('application/json');
        if (!modes.includes(modus)) {
            reply.status(400);
            return { message: `${modus} is not a valid lademodus` };
        }

        return {
            response: (
                await axios({
                    url: config.OPENWB_URL + '/openWB/web/api.php?lademodus=' + modus,
                })
            ).data,
        };
    },
} as RouteOptions;

export default lademodusSetRoute;
