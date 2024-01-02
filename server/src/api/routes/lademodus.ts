import { getKey } from '@db/redis';
import { MyServer, UserReply, UserRequest } from '../types';
import { mqttClient } from 'openWB/client';

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
            let setMode: number;

            // must be an integer 0-4
            const modusInt = Number(modus);
            if (!isNaN(modusInt)) {
                if ([0, 1, 2, 3, 4].includes(modusInt)) {
                    setMode = modusInt;
                } else {
                    reply.status(400);
                    return { message: `${modus} is not a valid lademodus` };
                }
            } else {
                const modusStr = modus as string;
                if (modes.includes(modusStr)) {
                    setMode = modes.indexOf(modusStr);
                } else {
                    reply.status(400);
                    return { message: `${modus} is not a valid lademodus` };
                }
            }

            reply.type('application/json');

            await mqttClient.publish('openWB/set/ChargeMode', setMode + '');
            await mqttClient.publish('openWB/global/ChargeMode', setMode + '');

            return {};
        },
    });
};

export default lademodusRoute;
