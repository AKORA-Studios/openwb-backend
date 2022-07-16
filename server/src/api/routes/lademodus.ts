import axios from 'axios';
import config from '../../config';
import { getKey } from '@db/redis';
import { MyServer, UserReply, UserRequest } from '../types';

export const lademodusRoute = (server: MyServer) => {
    server.route({
        url: '/lademodus',
        method: 'GET',
        preHandler: server.auth([server.verifyJWT]),
        handler: async (req: UserRequest, reply: UserReply) => {
            reply.type('application/json').code(200);
            const chargeModeInt = (await getKey('openWB/global/ChargeMode')) as number;
            return {
                modusName: ['Sofortladen', 'Min + PV', 'PV Überschuss', 'Standby', 'Stop'][
                    chargeModeInt
                ],
                modus: chargeModeInt,
            };
        },
    });

    server.route({
        url: '/lademodus/:modus',
        method: 'POST',
        preHandler: server.auth([server.verifyJWT]),
        handler: async (req: UserRequest, reply: UserReply) => {
            const { modus } = req.params as any as { modus: string | number };

            const modes = ['jetzt', 'minundpv', 'pvuberschuss', 'standby', 'stop'];
            let setMode: string;

            if (!isNaN(Number(modus))) {
                //Integer 0-4
                const modusInt = Number(modus);
                if (![0, 1, 2, 3, 4].includes(modusInt)) {
                    reply.status(400);
                    return { message: `${modus} is not a valid lademodus` };
                }
                setMode = modes[modusInt];
            } else {
                //String
                if (!modes.includes(modus as string)) {
                    reply.status(400);
                    return { message: `${modus} is not a valid lademodus` };
                }
                setMode = modus as string;
            }

            reply.type('application/json');

            if (!modes.includes(setMode)) {
                throw new Error(`${modus} or ${setMode} is not a valid lademodus`);
            }

            return {
                response: (
                    await axios({
                        url: config.OPENWB_URL + '/openWB/web/api.php?lademodus=' + setMode,
                    })
                ).data,
            };
        },
    });
};

export default lademodusRoute;
