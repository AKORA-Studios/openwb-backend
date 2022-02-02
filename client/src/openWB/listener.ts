import mqttListener, { mqqtClient } from './client';
import { topicMap } from './topics';

export let ready: Promise<boolean> | boolean = new Promise((r) =>
    mqqtClient.on('connect', async () => {
        console.log('MQTT Client connected');
        r(true);
        let sub = await mqqtClient.subscribe('#');
        console.log(
            'Topics:',
            sub.map((s) => s.topic)
        );

        mqqtClient.on('message', (topic, payload, packet) => {
            console.log(
                'MQQT -',
                topic,
                '-',
                JSON.stringify(payload.toString())
            );

            //@ts-ignore
            let type = typeof topicMap.SCHREIBEND[topic],
                val: any;
            switch (type) {
                case 'number':
                    val = Number(payload);
                    break;
                case 'string':
                    val = payload.toString();
                    break;
            }

            mqttListener.emit(topic as any, val);
            mqttListener.emit('all', { topic, value: val });
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
