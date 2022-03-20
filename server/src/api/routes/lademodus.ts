import { RouteOptions } from 'fastify';
import server from '../..';
import { getKey } from '../../db/redis';

export const lademodusRoute = {
    url: '/lademodus',
    method: 'GET',
    preHandler: server.auth([server.verifyJWT]),
    handler: async (req, reply) => {
        reply.type('application/json').code(200);
        const chargeModeInt = (await getKey('openWB/global/ChargeMode')) as number;
        return {
            modus: ['Sofortladen', 'Min + PV', 'PV Überschuss', 'Stop', 'Standby'][chargeModeInt],
        };
    },
} as RouteOptions;

export default lademodusRoute;
