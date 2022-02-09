import { Registry, Gauge } from 'prom-client';
import { getKey } from '../db/redis';
import getRFID from './getRFID';

const registery = new Registry();

const metricsMap: {
    name: string;
    help?: string;
    key?: string;
    func?: (() => number) | (() => Promise<number>);
}[] = [
    {
        name: 'Soc',
        key: 'openWB/lp/1/%Soc',
    },
    {
        name: 'RFID',
        func: async () => (await getRFID()).tagName?.charCodeAt(0)!,
    },
    {
        name: 'W',
        key: 'openWB/lp/1/W',
    },
];

//Register all metrics from the metricsMap
export function register() {
    for (let { name, help, key, func } of metricsMap) {
        new Gauge({
            name,
            help: help ?? name,
            async collect() {
                // Invoked when the registry collects its metrics' values.
                // This can be synchronous or it can return a promise/be an async function.

                if (func) {
                    this.set(await func());
                } else {
                    this.set(await getKey(key!));
                }
            },
        });
    }
}

export async function getMetrics() {
    return await registery.metrics();
}

export default getMetrics;
