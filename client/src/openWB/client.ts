import { connect, IClientOptions } from 'async-mqtt';
import config from '../config';
import { TopicListener } from './topicListener';

const mqqtOptions: IClientOptions = {};
if (config.MQTT_USERNAME && config.MQTT_PASSWORD) {
    mqqtOptions.username = config.MQTT_USERNAME;
    mqqtOptions.password = config.MQTT_PASSWORD;
}

export const client = connect(config.MQTT_URL, mqqtOptions);
export const mqttListener = new TopicListener(client);

export default mqttListener;
