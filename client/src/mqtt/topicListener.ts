import EventEmitter from 'events';
import { topics } from './topics';

type SubscribeEvents = topics.LESEND;
type PubishEvents = topics.SCHREIBEND;

export class TopicListener extends EventEmitter {
    public publish<K extends keyof PubishEvents>(
        event: K,
        message: PubishEvents[K]
    ) {}
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

    publish<K extends keyof PubishEvents>(
        event: K,
        message: PubishEvents[K]
    ): void;
}
