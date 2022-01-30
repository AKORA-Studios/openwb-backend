import EventEmitter from 'events';

export interface TopicEvents {
    cacheSweep: [message: string];
    channelCreate: [channel: NonThreadGuildBasedChannel];
    channelDelete: [channel: DMChannel | NonThreadGuildBasedChannel];
    channelPinsUpdate: [channel: TextBasedChannel, date: Date];
    channelUpdate: [
        oldChannel: DMChannel | NonThreadGuildBasedChannel,
        newChannel: DMChannel | NonThreadGuildBasedChannel,
    ];
    debug: [message: string];
    warn: [message: string];
    emojiCreate: [emoji: GuildEmoji]
}

class TopicListener extends EventEmitter {
    public on<K extends keyof TopicEvents>(event: K, listener: (...args: TopicEvents[K]) => Awaitable<void>): this;
    public on<S extends string | symbol>(
        event: Exclude<S, keyof TopicEvents>,
        listener: (...args: any[]) => Awaitable<void>,
    ): this;

    public once<K extends keyof TopicEvents>(event: K, listener: (...args: TopicEvents[K]) => Awaitable<void>): this;
    public once<S extends string | symbol>(
        event: Exclude<S, keyof TopicEvents>,
        listener: (...args: any[]) => Awaitable<void>,
    ): this;

    public emit<K extends keyof TopicEvents>(event: K, ...args: TopicEvents[K]): boolean;
    public emit<S extends string | symbol>(event: Exclude<S, keyof TopicEvents>, ...args: unknown[]): boolean;

    public off<K extends keyof TopicEvents>(event: K, listener: (...args: TopicEvents[K]) => Awaitable<void>): this;
    public off<S extends string | symbol>(
        event: Exclude<S, keyof TopicEvents>,
        listener: (...args: any[]) => Awaitable<void>,
    ): this;

    public removeAllListeners<K extends keyof TopicEvents>(event?: K): this;
    public removeAllListeners<S extends string | symbol>(event?: Exclude<S, keyof TopicEvents>): this;
}