import { getKey } from '../db/redis';

export async function getGlobals() {
    return {
        WHouseConsumption: await getKey('openWB/global/WHouseConsumption'),
        WAllChargePoints: await getKey('openWB/global/WAllChargePoints'),
        ChargeMode: await getKey('openWB/global/ChargeMode'),
        boolChargeAtNight_direct: await getKey('openWB/boolChargeAtNight_direct'),
        boolChargeAtNight_nurpv: await getKey('openWB/boolChargeAtNight_nurpv'),
        boolChargeAtNight_minpv: await getKey('openWB/boolChargeAtNight_minpv'),
        boolDisplayHouseConsumption: await getKey('openWB/boolDisplayHouseConsumption'),
        boolDisplayDailyCharged: await getKey('openWB/boolDisplayDailyCharged'),
        boolEvuSmoothedActive: await getKey('openWB/boolEvuSmoothedActive'),
        boolDisplayHouseBatteryPriority: await getKey('openWB/boolDisplayHouseBatteryPriority'),
        strLastmanagementActive: await getKey('openWB/strLastmanagementActive'),
    };
}

export default getGlobals;
