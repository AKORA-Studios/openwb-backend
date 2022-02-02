import mqttListener, { client } from './client';
import { topicMap } from './topics';

export let ready: Promise<boolean> | boolean = new Promise((r) =>
    client.on('connect', async () => {
        console.log('MQTT Client connected');
        r(true);
        let sub = await client.subscribe('#');
        console.log(
            'Topics:',
            sub.map((s) => s.topic)
        );

        client.on('message', (topic, payload, packet) => {
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
client.on('reconnect', () => {
    count++;
    console.count('Reconnecting...');
    if (count === 5) client.end();
});

// Handling error events
client.on('disconnect', (e) => console.log('MQTT disconnected:', e));
client.on('error', (e) => console.log('MQTT error:', e));
client.on('end', () => {
    console.log('Destroyed client');
    //process.exit(1);
});
