import { connect, IClientOptions } from 'async-mqtt';
import config from '../config';
import { TopicListener } from './topicListener';
import { topicMap } from './topics';

const mqqtOptions: IClientOptions = {};
if (config.MQTT_USER && config.MQTT_PASSWORD) {
    mqqtOptions.username = config.MQTT_USER;
    mqqtOptions.password = config.MQTT_PASSWORD;
}

const client = connect(config.MQTT_URL, mqqtOptions);
export const mqttListener = new TopicListener(client);

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
            mqttListener.emit('all', val);
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

export default mqttListener;
