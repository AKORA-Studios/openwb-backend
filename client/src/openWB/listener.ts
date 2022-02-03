import { setKey } from '../db/redis';
import mqttListener, { mqqtClient } from './client';

export let ready: Promise<boolean> | boolean = new Promise((r) =>
    mqqtClient.on('connect', async () => {
        r(true);
        let sub = await mqqtClient.subscribe('#');
        console.log(
            'Topics:',
            sub.map((s) => s.topic)
        );

        mqqtClient.on('message', async (topicRaw, payload, packet) => {
            let topic = topicRaw.split('/').slice(1).join('/'),
                str = payload.toString();

            let isNumber = !isNaN(Number(str)),
                val: any = str;

            if (isNumber) val = Number(Number(str));

            console.log('MQQT -', topic, '-', JSON.stringify(val));

            mqttListener.emit(topic as any, val);
            mqttListener.emit('all', { topic, value: val });

            await setKey(topic, val);
        });
    })
);

// Limit to 10 reconnections
let count = 0;
mqqtClient.on('reconnect', () => {
    count++;
    console.count('Reconnecting...');
    if (count === 5) mqqtClient.end();
});

// Handling error events
mqqtClient.on('disconnect', (e) => console.log('MQTT disconnected:', e));
mqqtClient.on('error', (e) => console.log('MQTT error:', e));
mqqtClient.on('end', () => {
    console.log('Destroyed client');
    //process.exit(1);
});
