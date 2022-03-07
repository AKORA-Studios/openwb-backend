import { getManager } from 'typeorm';
import getLiveValues from '../../api/getLiveValues';
import config from '../../config';
import mqttListener from '../../openWB/client';
import openWB from '../models/graph';

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
});

mqttListener.on('openWB/graph/lastlivevalues', (str) => {});
