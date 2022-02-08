import { AsyncClient, connect, IClientOptions } from 'async-mqtt';
import EventEmitter from 'events';

export function connectMQTTClient(url: string, mqttOptions: IClientOptions) {
    return new Promise((res, rej) => {
        let mqttClient = connect(url, mqttOptions);
        mqttClient.on('connect', () => {
            console.log('Connected to MQQT Broker at', url);
            res(mqttClient);
        });
    });
}

export async function subsribe(client: AsyncClient, filter?: string) {
    if (client.options.username) filter = client.options.username + '/' + filter; //Add default prefix

    const emitter = new EventEmitter();
    await client.subscribe('#');
    client.on('message', (topic, payload) => {
        let str = topic.split('/').slice(1).join('/');
        if (filter && !filter.includes('#')) {
            if (!str.includes(filter)) return;
        }

        emitter.emit('message', str, payload.toString());
    });

    return emitter;
}

export default connectMQTTClient;
