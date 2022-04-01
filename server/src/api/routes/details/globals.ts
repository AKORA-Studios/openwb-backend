import { getKey } from '@db/redis';
import { UserRequest } from '../../types';
import { MyServer } from '../../types';

export default (server: MyServer) => {
    server.route({
        url: '/globals',
        method: 'GET',
        preHandler: server.auth([server.verifyJWT]),
        handler: async (req: UserRequest) => {
            return {
                chargeMode: await getKey('openWB/global/ChargeMode'),
                chargeAtNight_direct: await getKey('openWB/boolChargeAtNight_direct'),
                chargeAtNight_nurpv: await getKey('openWB/boolChargeAtNight_nurpv'),
                chargeAtNight_minpv: await getKey('openWB/boolChargeAtNight_minpv'),
                evuSmoothedActive: await getKey('openWB/boolEvuSmoothedActive'),
                strLastmanagementActive: await getKey('openWB/strLastmanagementActive'),
                kWhPrice: Number(await getKey('openWB/system/priceForKWh')),
            };
        },
    });
};
