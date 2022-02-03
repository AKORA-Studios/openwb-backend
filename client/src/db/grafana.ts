import getLiveValues from '../api/getLiveValues';
import mqttListener from '../openWB/client';

mqttListener.on('openWB/graph/alllivevalues', async (str) => {
    const values = await getLiveValues();
    //19:35:56,5949,1588,0,0,1588,1588,-7,1,14,24,4368,358,0';
    //Daten für den Live Graph, gibt nur die neusten Daten wieder. Aufbau:
    //Time,EVU,LadeleistungGesamt,PV,Ladeleistung LP2,Ladeleistung LP3, Speicherleistung,
    // SpeicherSoC, SoC Lp1, SoC lp2, Hausverbrauch, Verbraucher' :1, Verbraucher 2
});
mqttListener.on('openWB/graph/lastlivevalues', (str) => {});
