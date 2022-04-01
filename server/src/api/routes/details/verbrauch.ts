import { getKey } from '@db/redis';
import { UserRequest } from '../..';
import { MyServer } from '../../types';

export default (server: MyServer) => {
    server.route({
        url: '/verbrauch',
        method: 'GET',
        preHandler: server.auth([server.verifyJWT]),
        handler: async () => {
            return {
                evu: {
                    W: await getKey('openWB/evu/W'),
                    phase: {
                        W: [
                            await getKey('openWB/evu/WPhase1'),
                            await getKey('openWB/evu/WPhase2'),
                            await getKey('openWB/evu/WPhase3'),
                        ],
                        A: [
                            await getKey('openWB/evu/APhase1'),
                            await getKey('openWB/evu/APhase2'),
                            await getKey('openWB/evu/APhase3'),
                        ],
                    },
                    WhImported: await getKey('openWB/evu/WhImported'),
                    WhExported: await getKey('openWB/evu/WhExported'),
                    ASchieflast: await getKey('openWB/evu/ASchieflast'),
                },
                verbraucher: {
                    WNr1: await getKey('openWB/Verbraucher/WNr1'),
                    WhImportedNr1: await getKey('openWB/Verbraucher/WhImportedNr1'),
                    WhExportedNr1: await getKey('openWB/Verbraucher/WhExportedNr1'),
                    WNr2: await getKey('openWB/Verbraucher/WNr2'),
                    WhImportedNr2: await getKey('openWB/Verbraucher/WhImportedNr2'),
                    WhExportedNr2: await getKey('openWB/Verbraucher/WhExportedNr2'),
                },
                pv: {
                    W: await getKey('openWB/pv/W'),
                    WhCounter: await getKey('openWB/pv/WhCounter'),
                    CounterTillStartPvCharging: await getKey(
                        'openWB/pv/CounterTillStartPvCharging'
                    ),
                },
                housebattery: {
                    W: await getKey('openWB/housebattery/W'),
                    Soc: await getKey('openWB/housebattery/%Soc'),
                    WhImported: await getKey('openWB/housebattery/WhImported'),
                    WhExported: await getKey('openWB/housebattery/WhExported'),
                },
            };
        },
    });
};
