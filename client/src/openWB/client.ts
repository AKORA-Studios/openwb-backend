import { connect, IClientOptions } from 'async-mqtt';
import config from '../config';
import { TopicListener } from './topicListener';

const mqqtOptions: IClientOptions = {};
if (config.MQTT_USERNAME && config.MQTT_PASSWORD) {
    mqqtOptions.username = config.MQTT_USERNAME;
    mqqtOptions.password = config.MQTT_PASSWORD;
}

export const mqqtClient = connect(config.MQTT_URL, mqqtOptions);
export const mqttListener = new TopicListener(mqqtClient);

export const mqqtReady: Promise<boolean> = new Promise((r) => mqqtClient.on('connect', () => r(true)));

export async function connectMQTTClient() {
    await mqqtReady;
    console.log('Connected to MQQT Broker at', config.MQTT_URL);
}

export async function disconnectMQTTClient() {
    await mqqtClient.end();
    console.log('Disconnected from MQQT Broker');
}

export default mqttListener;

//Do stuff when ready
import './listener';
import '../db/grafana';
