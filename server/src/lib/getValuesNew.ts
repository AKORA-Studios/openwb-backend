import { getKey } from '@db/redis';

export async function getValuesNew() {
    let time = Math.round(((await getKey('openWB/system/time')) as number) * 1000);
    let evu = Number(await getKey('openWB/counter/0/get/power'));
    let pv1 = Number(await getKey('openWB/pv/3/get/power'));
    let pv2 = Number(await getKey('openWB/pv/1/get/power'));
    let vb1 = Number(await getKey('openWB/counter/0/get/power'));
    let ekarus_soc = Number(await getKey('openWB/vehicle/1/get/soc'));
    let ekarus_service_soc = Number(await getKey('openWB/vehicle/1/get/service_soc'));
    let lp1_leistung = Number(await getKey('openWB/chargepoint/4/get/power'));
    let speicher_soc = Number(await getKey('openWB/bat/get/soc'));
    let speicher_leistung = Number(await getKey('openWB/bat/get/power'));

    return {
        /** UTC */ time,
        evu,
        pv1,
        pv2,
        vb1,
        ekarus_soc,
        ekarus_service_soc,
        lp1_leistung,
        speicher_soc,
        speicher_leistung,
    };
}

export default getValuesNew;
