import { DateTime } from 'luxon';
import { getKey } from '../db/redis';

export async function getLiveValues() {
    let str = await getKey('openWB/system/lastlivevalues');
    if (!str) str = await getKey('openWB/system/alllivevalues');
    if (!str) return null;

    let arr = str.split(',').map((s: any) => (isNaN(Number(s)) ? s : Number(s)));

    return {
        time: DateTime.fromISO(arr[0]).toISO(),
        evu: arr[1],
        ladeleistungGesamt: arr[2],
        PV: arr[3],
        LadeleistungLP2: arr[4],
        LadeleistungLP3: arr[5],
        Speicherleistung: arr[6],
        SpeicherSoC: arr[7],
        SoCLp1: arr[8],
        SoCLp2: arr[9],
        Hausverbrauch: arr[10],
        VB1: arr[11],
        VB2: arr[12],
    };
}

export default getLiveValues;
