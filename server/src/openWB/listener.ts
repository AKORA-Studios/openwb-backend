import { stop } from '..';
import { setKey } from '../db/redis';
import mqttListener, { mqttClient, mqttReady } from './client';

mqttReady.then(async () => {
    await mqttClient.subscribe('#');

    mqttClient.on('message', async (topicRaw, payload, packet) => {
        let topic = topicRaw.split('/').slice(1).join('/'),
            str = payload.toString();

        let isNumber = !isNaN(Number(str)),
            val: any = str;

        if (isNumber) val = Number(Number(str));

        // if (topic.includes('lastlivevalues')) console.log('MQTT -', topic, '-', JSON.stringify(val));

        await setKey(topic, val);

        mqttListener.emit(topic as any, val);
        mqttListener.emit('all', { topic, value: val });
    });
});

// Limit to 10 reconnections
let count = 0;
mqttClient.on('reconnect', () => {
    count++;
    console.count('Reconnecting...');

    setTimeout(() => {
        if (mqttClient.connected) return;
        //Stop client if stuck at reconnecting;
        stop(`MQTT tried reconnect ${count} times and didn't reconnect`);
    }, 1000);
    if (count === 5) stop(`MQTT stopped reconnecting after ${count} times`);
});

// Handling error events
mqttClient.on('disconnect', (e) => console.log('MQTT disconnected:', e));
mqttClient.on('error', (e) => {
    console.log(' - MQTTClient threw:', e);
    mqttClient.reconnect(); //Reconnect to try resolving the issue
});
mqttClient.on('end', () => {
    console.log('Destroyed MQTT client');
    setTimeout(() => {
        //Stop server after 3 secons of destroyed client, weird bug idk
        stop('Destroyed MQTT client');
    }, 3000);
    //process.exit(1);
});
