import { getKey } from '@db/redis';

export async function getLiveValues() {
    let str = (await getKey('openWB/system/lastlivevalues')) as string;
    if (!str) str = (await getKey('openWB/system/alllivevalues')) as string;
    if (!str) return null;

    let arr = str.split(',').map((s: any) => (isNaN(Number(s)) ? s : Number(s)));

    const mapped = {
        time: ((await getKey('openWB/system/Timestamp')) as number) * 1000,
        evu: arr[1] as number,
        ladeleistungGesamt: arr[2] as number,
        PV: arr[3] as number,
        LadeleistungLP2: arr[4] as number,
        LadeleistungLP3: arr[5] as number,
        Speicherleistung: arr[6] as number,
        SpeicherSoC: arr[7] as number,
        SoCLp1: arr[8] as number,
        SoCLp2: arr[9] as number,
        Hausverbrauch: arr[10] as number,
        VB1: arr[11] as number,
        VB2: arr[12] as number,
    };

    return {
        /** UTC */
        time: mapped.time,
        evu: mapped.evu,
        ladeleistung: mapped.ladeleistungGesamt,
        photovoltaik: mapped.PV,
        hausverbrauch: mapped.VB1,
    };
}

export default getLiveValues;
