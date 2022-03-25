import { connect, IClientOptions } from 'async-mqtt';
import config from '../config';
import { TopicListener } from './topicListener';

const mqttOptions: IClientOptions = {
    reconnectPeriod: 1000, //Intervall between attemps to reconnect
};
if (config.MQTT_USERNAME && config.MQTT_PASSWORD) {
    mqttOptions.username = config.MQTT_USERNAME;
    mqttOptions.password = config.MQTT_PASSWORD;
}

export const mqttClient = connect(config.MQTT_URL, mqttOptions);
export const mqttListener = new TopicListener(mqttClient);

export const mqttReady: Promise<boolean> = new Promise((r) => mqttClient.on('connect', () => r(true)));

export async function connectMQTTClient() {
    await mqttReady;
    console.log(' - Connected to MQTT Broker at', config.MQTT_URL);
}

export async function disconnectMQTTClient() {
    await mqttClient.end();
    console.log(' - Disconnected from MQTT Broker');
}

export default mqttListener;

//Do stuff when ready
import './listener';
