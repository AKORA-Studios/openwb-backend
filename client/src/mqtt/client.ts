import { connect, IClientOptions } from 'async-mqtt';
import config from '../config';
import { TopicListener } from './topicListener';

console.log(config);

const mqqtOptions: IClientOptions = {};
if (config.MQTT_USER && config.MQTT_PASSWORD) {
    mqqtOptions.username = config.MQTT_USER;
    mqqtOptions.password = config.MQTT_PASSWORD;
}

const client = connect(config.MQTT_URL, mqqtOptions);
const mqttListener = new TopicListener();

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
            mqttListener.emit(topic as any, payload);
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

export default client;
