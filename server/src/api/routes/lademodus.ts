import axios from 'axios';
import config from '../../config';
import { getKey } from '../../db/redis';
import { MyServer } from '../endpoints';

export const lademodusRoute = (server: MyServer) => {
    server.route({
        url: '/lademodus',
        method: 'GET',
        preHandler: server.auth([server.verifyJWT]),
        handler: async (req, reply) => {
            reply.type('application/json').code(200);
            const chargeModeInt = (await getKey('openWB/global/ChargeMode')) as number;
            return {
                modus: ['Sofortladen', 'Min + PV', 'PV Überschuss', 'Stop', 'Standby'][
                    chargeModeInt
                ],
            };
        },
    });

    server.route({
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
    });
};

export default lademodusRoute;
