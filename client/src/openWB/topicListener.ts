import { AsyncMqttClient } from 'async-mqtt';
import EventEmitter from 'events';
import { topicMap, topics } from './topics';

type SubscribeEvents = topics.LESEND;
type PublishEvents = topics.SCHREIBEND;

export class TopicListener extends EventEmitter {
    protected client: AsyncMqttClient;
    constructor(client: AsyncMqttClient) {
        super();
        this.client = client;
    }
    public publish<K extends keyof PublishEvents>(
        event: K,
        message: PublishEvents[K]
    ): Promise<void> {
        //@ts-ignore
        let type = typeof topicMap.SCHREIBEND[event];

        return this.client.publish(event, message.toString());
    }

    public destroy(): Promise<void> {
        this.removeAllListeners();
        return this.client.end();
    }
}

export declare interface TopicListener {
    on<K extends keyof SubscribeEvents>(
        event: K,
        listener: (message: SubscribeEvents[K]) => any
    ): this;
    on<S extends string | symbol>(
        event: Exclude<S, keyof SubscribeEvents>,
        listener: (message: any[]) => any
    ): this;

    once<K extends keyof SubscribeEvents>(
        event: K,
        listener: (message: SubscribeEvents[K]) => any
    ): this;
    once<S extends string | symbol>(
        event: Exclude<S, keyof SubscribeEvents>,
        listener: (message: any[]) => any
    ): this;

    emit<K extends keyof SubscribeEvents>(
        event: K,
        message: SubscribeEvents[K]
    ): boolean;
    emit<S extends string | symbol>(
        event: Exclude<S, keyof SubscribeEvents>,
        message: unknown[]
    ): boolean;

    off<K extends keyof SubscribeEvents>(
        event: K,
        listener: (message: SubscribeEvents[K]) => any
    ): this;
    off<S extends string | symbol>(
        event: Exclude<S, keyof SubscribeEvents>,
        listener: (message: any[]) => any
    ): this;

    removeAllListeners<K extends keyof SubscribeEvents>(event?: K): this;
    removeAllListeners<S extends string | symbol>(
        event?: Exclude<S, keyof SubscribeEvents>
    ): this;

    publish<K extends keyof PublishEvents>(
        event: K,
        message: PublishEvents[K]
    ): Promise<void>;

    destroy(): Promise<void>;
}
