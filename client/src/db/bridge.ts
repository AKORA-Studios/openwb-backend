import { mqttListener } from 'openWB';
import { Ladepunkt } from './models';

mqttListener.on('all', async ({ topic, value }) => {
    const end = topic.split('/').reverse()[0];
    //@ts-ignore
    if (Ladepunkt[end]) {
        //@ts-ignore
        Ladepunkt[end] = value;
        await Ladepunkt.save();
    }
});
