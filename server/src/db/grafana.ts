//import { Point } from '@influxdata/influxdb-client';
import { getManager } from 'typeorm';
import getLiveValues from '../api/getLiveValues';
import config from '../config';
import mqttListener from '../openWB/client';
import openWB from './entity';

mqttListener.on('openWB/system/lastlivevalues', async (str) => {
    const values = await getLiveValues();
    if (!values) return;

    if (config.NODE_ENV === 'production') {
        const point = new openWB();
        for (let key in values) {
            if (key === 'time') {
                point['time'] = new Date();
                continue;
            }
            //@ts-ignore
            point[key] = values[key];
        }

        await getManager().save(point);
    }
    //console.log('Wrote values for:', point.time.toTimeString(), '/', point.time.toLocaleTimeString('de'));

    /*
    const pointasdsad = new Point('graph_point')
        .tag('test', 'ABC')
        .floatField('time', values.time)
        .floatField('evu', values.evu)
        .floatField('ladeleistungGesamt', values.ladeleistungGesamt)
        .floatField('PV', values.PV)
        .floatField('LadeleistungLP2', values.LadeleistungLP2)
        .floatField('LadeleistungLP3', values.LadeleistungLP3)
        .floatField('Speicherleistung', values.Speicherleistung)
        .floatField('SpeicherSoC', values.SpeicherSoC)
        .floatField('SoCLp1', values.SoCLp1)
        .floatField('SoCLp2', values.SoCLp2)
        .floatField('Hausverbrauch', values.Hausverbrauch)
        .floatField('VB1', values.VB1)
        .floatField('VB2', values.VB2);

    influxApi.writePoint(pointasdsad);
    */

    //19:35:56,5949,1588,0,0,1588,1588,-7,1,14,24,4368,358,0';
    //Daten für den Live Graph, gibt nur die neusten Daten wieder. Aufbau:
    //Time,EVU,LadeleistungGesamt,PV,Ladeleistung LP2,Ladeleistung LP3, Speicherleistung,
    // SpeicherSoC, SoC Lp1, SoC lp2, Hausverbrauch, Verbraucher' :1, Verbraucher 2
});
mqttListener.on('openWB/graph/lastlivevalues', (str) => {});
