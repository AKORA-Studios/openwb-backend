import EventEmitter from 'events';
import { topics } from './types';

type SubscribeEvents = topics.LESEND
type PubishEvents = topics.SCHREIBEND


class TopicListener extends EventEmitter {
    public on<K extends keyof SubscribeEvents>(event: K, listener: (...args: SubscribeEvents[K]) => Awaitable<void>): this;
    public on<S extends string | symbol>(
        event: Exclude<S, keyof SubscribeEvents>,
        listener: (...args: any[]) => Awaitable<void>,
    ): this;

    public once<K extends keyof SubscribeEvents>(event: K, listener: (...args: SubscribeEvents[K]) => Awaitable<void>): this;
    public once<S extends string | symbol>(
        event: Exclude<S, keyof SubscribeEvents>,
        listener: (...args: any[]) => Awaitable<void>,
    ): this;

    public emit<K extends keyof SubscribeEvents>(event: K, ...args: SubscribeEvents[K]): boolean;
    public emit<S extends string | symbol>(event: Exclude<S, keyof SubscribeEvents>, ...args: unknown[]): boolean;

    public off<K extends keyof SubscribeEvents>(event: K, listener: (...args: SubscribeEvents[K]) => Awaitable<void>): this;
    public off<S extends string | symbol>(
        event: Exclude<S, keyof SubscribeEvents>,
        listener: (...args: any[]) => Awaitable<void>,
    ): this;

    public removeAllListeners<K extends keyof SubscribeEvents>(event?: K): this;
    public removeAllListeners<S extends string | symbol>(event?: Exclude<S, keyof SubscribeEvents>): this;

    public publish<K extends keyof PubishEvents>(event: K, ...args: PubishEvents[K]): boolean;
}