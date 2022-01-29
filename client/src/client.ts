import { connect, IClientOptions } from 'async-mqtt';
import config from './config';

const mqqtOptions: IClientOptions = {};
if (config.MQTT_USER && config.MQTT_PASSWORD) {
    mqqtOptions.username = config.MQTT_USER;
    mqqtOptions.password = config.MQTT_PASSWORD;
}

const client = connect(config.MQTT_URL, mqqtOptions);

export let ready: Promise<boolean> | boolean = new Promise((r) =>
    client.on('connect', () => {
        console.log('MQTT Client connected');
        r(true);
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
    process.exit(1);
});

export async function run() {
    await ready;

    try {
        await client.publish('wow/so/cool', 'It works!');
        client.end();
    } catch (e) {
        console.log('MQTT Error', e);
    }
}

export default client;
