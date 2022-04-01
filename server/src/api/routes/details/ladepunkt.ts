import { getKey } from '@db/redis';
import { UserRequest } from '../..';
import { MyServer } from '../../types';

export default (server: MyServer) => {
    server.route({
        url: '/ladepunkt',
        method: 'GET',
        preHandler: server.auth([server.verifyJWT]),
        handler: async () => {
            return {
                name: await getKey('openWB/lp/1/strChargePointName'),
                soc: await getKey('openWB/lp/1/%Soc'),
                timeRemaining: await getKey('openWB/lp/1/TimeRemaining'),
                phase: {
                    Pf: [
                        await getKey('openWB/lp/1/PfPhase1'),
                        await getKey('openWB/lp/1/PfPhase2'),
                        await getKey('openWB/lp/1/PfPhase3'),
                    ],
                    V: [
                        await getKey('openWB/lp/1/VPhase1'),
                        await getKey('openWB/lp/1/VPhase2'),
                        await getKey('openWB/lp/1/VPhase3'),
                    ],
                    A: [
                        await getKey('openWB/lp/1/APhase1'),
                        await getKey('openWB/lp/1/APhase2'),
                        await getKey('openWB/lp/1/APhase3'),
                    ],
                },
                kWhDaily: await getKey('openWB/lp/1/kWhDailyCharged'),
                kWhCounter: await getKey('openWB/lp/1/kWhCounter'),
                W: await getKey('openWB/lp/1/W'),
                enabled: await getKey('openWB/lp/1/ChargePointEnabled'),
            };
        },
    });
};
