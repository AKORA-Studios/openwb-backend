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

    let time = Math.round(((await getKey('openWB/system/time')) as number) * 1000);
    let speicher_soc = Number(await getKey('openWB/bat/get/soc'));
    let speicherleistung = Number(await getKey('openWB/bat/get/power'));
    let ladeleistung = Number(await getKey('openWB/chargepoint/4/get/power'));
    let photovoltaik = Number(await getKey('openWB/pv/get/power'));
    let evu = Number(await getKey('openWB/counter/0/get/power'));
    let soc_lp1 = Number(await getKey('openWB/vehicle/1/get/soc'));

    return {
        /** UTC */
        time: time,
        evu: evu,
        photovoltaik,
        hausverbrauch: 0,
        ladeleistung,

        ladeleistung_lp1: ladeleistung,
        ladeleistung_lp2: 0,
        speicherleistung,
        speicher_soc,
        soc_lp1,
        soc_lp2: 0,
        vb1: 0,
        vb2: 0,
    };
}

export default getLiveValues;
