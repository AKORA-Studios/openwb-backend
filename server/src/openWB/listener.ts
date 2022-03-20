import { stop } from '..';
import { setKey } from '../db/redis';
import mqttListener, { mqqtClient, mqqtReady } from './client';

mqqtReady.then(async () => {
    await mqqtClient.subscribe('#');

    mqqtClient.on('message', async (topicRaw, payload, packet) => {
        let topic = topicRaw.split('/').slice(1).join('/'),
            str = payload.toString();

        let isNumber = !isNaN(Number(str)),
            val: any = str;

        if (isNumber) val = Number(Number(str));

        // if (topic.includes('lastlivevalues')) console.log('MQQT -', topic, '-', JSON.stringify(val));

        await setKey(topic, val);

        mqttListener.emit(topic as any, val);
        mqttListener.emit('all', { topic, value: val });
    });
});

// Limit to 10 reconnections
let count = 0;
mqqtClient.on('reconnect', () => {
    count++;
    console.count('Reconnecting...');

    setTimeout(() => {
        if (mqqtClient.connected) return;
        //Stop client if stuck at reconnecting;
        stop(`MQTT tried reconnect ${count} times and didn't reconnect`);
    }, 1000);
    if (count === 5) stop(`MQTT stopped reconnecting after ${count} times`);
});

// Handling error events
mqqtClient.on('disconnect', (e) => console.log('MQTT disconnected:', e));
mqqtClient.on('error', (e) => {
    console.log(' - MQTTClient threw:', e);
    mqqtClient.reconnect(); //Reconnect to try resolving the issue
});
mqqtClient.on('end', () => {
    console.log('Destroyed MQTT client');
    setTimeout(() => {
        //Stop server after 3 secons of destroyed client, weird bug idk
        stop('Destroyed MQTT client');
    }, 3000);
    //process.exit(1);
});
