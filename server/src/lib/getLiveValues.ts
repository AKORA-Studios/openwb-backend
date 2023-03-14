import { getKey } from '@db/redis';

export async function getLiveValues() {
    let str = (await getKey('openWB/system/lastlivevalues')) as string;
    if (!str) str = (await getKey('openWB/system/alllivevalues')) as string;
    if (!str) return null;

    let arr = str.split(',').map((s: any) => (isNaN(Number(s)) ? s : Number(s)));

    // mapping von www\html\openWB\graphing.sh:69
    const mapped = {
        time: ((await getKey('openWB/system/Timestamp')) as number) * 1000,
        evu: arr[1] as number,
        ladeleistung: arr[2] as number,
        pv: arr[3] as number,
        LadeleistungLP1: arr[4] as number,
        LadeleistungLP2: arr[5] as number,
        ladeleistung2: arr[6] as number,
        speicherleistung: arr[7] as number,
        SpeicherSoC: arr[8] as number,
        SoC: arr[9] as number,
        SoC1: arr[10] as number,
        hausverbrauch: arr[11] as number,
        VB1: arr[12] as number,
        VB2: arr[13] as number,
    };

    return {
        /** UTC */
        time: mapped.time,
        evu: mapped.evu,
        photovoltaik: mapped.pv,
        hausverbrauch: mapped.hausverbrauch,
        ladeleistung: mapped.ladeleistung,

        ladeleistung_lp1: mapped.LadeleistungLP1,
        ladeleistung_lp2: mapped.LadeleistungLP2,
        speicherleistung: mapped.speicherleistung,
        speicher_soc: mapped.SpeicherSoC,
        soc_lp1: mapped.SoC,
        soc_lp2: mapped.SoC1,
        vb1: mapped.VB1,
        vb2: mapped.VB2,
    };
}

export default getLiveValues;
