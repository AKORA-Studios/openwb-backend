import { getKey } from '@db/redis';

export async function getLiveValues() {
    let str = (await getKey('openWB/system/lastlivevalues')) as string;
    if (!str) str = (await getKey('openWB/system/alllivevalues')) as string;
    if (!str) return null;

    let arr = str.split(',').map((s: any) => (isNaN(Number(s)) ? s : Number(s)));

    // mapping von www\html\openWB\graphing.sh:69
    /**
    [0] $(date +%H:%M:%S)
    [1] $wattbezugint
    [2] $ladeleistung
    [3] $pvgraph
    [4] $ladeleistunglp1
    [5] $ladeleistunglp2
    [6] $ladeleistung
    [7] $speicherleistung
    [8] $speichersoc
    [9] $soc
    [10] $soc1
    [11] $hausverbrauch
    [12] $verbraucher1_watt
    [13] $verbraucher2_watt
    . . . 
     */

    const mapped = {
        time: ((await getKey('openWB/system/Timestamp')) as number) * 1000,
        evu: arr[1] as number,
        Ladeleistung: arr[2] as number,
        pv: arr[3] as number,
        LadeleistungLP1: arr[4] as number,
        LadeleistungLP2: arr[5] as number,
        Ladeleistung2: arr[6] as number,
        Speicherleistung: arr[7] as number,
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
        ladeleistung: mapped.Ladeleistung,

        ladeleistung_lp1: mapped.LadeleistungLP1,
        ladeleistung_lp2: mapped.LadeleistungLP2,
        speicherleistung: mapped.Speicherleistung,
        speicher_soc: mapped.SpeicherSoC,
        soc_lp1: mapped.SoC,
        soc_lp2: mapped.SoC1,
        vb1: mapped.VB1,
        vb2: mapped.VB2,
    };
}

export default getLiveValues;
