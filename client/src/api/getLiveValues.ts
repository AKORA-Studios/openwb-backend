import { getKey } from '../db/redis';

export async function getLiveValues() {
    let str = await getKey('openWB/graph/lastlivevalues');
    if (!str) str = await getKey('openWB/graph/alllivevalues');
    if (!str) return null;

    const arr = str.split(',');
    return {
        Time: arr[0],
        EVU: arr[1],
        LadeleistungGesamt: arr[2],
        PV: arr[3],
        'Ladeleistung LP2': arr[4],
        'Ladeleistung LP3': arr[5],
        Speicherleistung: arr[6],
        SpeicherSoC: arr[7],
        'SoC Lp1': arr[8],
        'SoC Lp2': arr[9],
        Hausverbrauch: arr[10],
        'Verbraucher 1': arr[11],
        'Verbraucher 2': arr[12],
    };
}

export default getLiveValues;
