import axios from 'axios';
import config from '../config';
import { FastifyPluginCallback } from 'fastify';
import redisClient, { getKey } from '../db/redis';
import getGlobals from '../lib/getGlobals';
import { getLadelog } from '../lib/getLadelog';
import getLadepunkt from '../lib/getLadepunkt';
import getLiveValues from '../lib/getLiveValues';
import getRFID from '../lib/getRFID';
import getVerbrauch from '../lib/getVerbrauch';

export const loadEndpoints: FastifyPluginCallback = (server) => {
    server.get('/ladepunkt', async (request, reply) => {
        reply.type('application/json').code(200);
        return await getLadepunkt();
    });

    server.get('/verbrauch', async (request, reply) => {
        reply.type('application/json').code(200);
        return await getVerbrauch();
    });

    server.get('/globals', async (request, reply) => {
        reply.type('application/json').code(200);
        return await getGlobals();
    });

    server.get('/rfid', async (request, reply) => {
        reply.type('application/json').code(200);
        const rfid = await getRFID();
        return { ...rfid, date: rfid.date.getTime() };
    });

    server.get('/values', async (request, reply) => {
        let values = await getLiveValues();
        reply.type('application/json');
        if (values) {
            reply.code(200);
            return values;
        } else {
            reply.code(404);
            return {
                code: 404,
                message: 'too early',
            };
        }
    });

    server.get('/lademodus', async (req, reply) => {
        reply.type('application/json').code(200);
        const chargeModeInt = (await getKey('openWB/global/ChargeMode')) as number;
        return {
            modus: ['Sofortladen', 'Min + PV', 'PV Überschuss', 'Stop', 'Standby'][chargeModeInt],
        };
    });

    server.all('/lademodus/:modus', async (request, reply) => {
        const { modus } = request.params as { modus: string };
        const modes = ['jetzt', 'minundpv', 'pvuberschuss', 'stop', 'standby'];

        reply.type('application/json');
        if (!modes.includes(modus)) {
            reply.status(400);
            return { message: `${modus} is not a valid lademodus` };
        }

        return {
            response: (
                await axios({
                    url: config.OPENWB_URL + '/openWB/web/api.php?lademodus=' + modus,
                })
            ).data,
        };
    });

    server.get('/ladestrom', async (request, reply) => {
        reply.type('application/json').code(200);
        return {
            min: await getKey('openWB/config/get/pv/lp/1/minCurrent '),
            max: await getKey('openWB/config/get/global/maxEVSECurrentAllowed'),
        };
    });

    server.get('/keys', async (request, reply) => {
        reply.type('application/json').code(200);

        const start = new Date().getTime();

        let keys = (await redisClient.keys('*')).sort();
        let obj = {} as any;
        for (let key of keys) obj[key] = await getKey(key);

        const timeDiff = new Date().getTime() - start;
        obj.time = timeDiff;

        return obj;
    });

    server.get('/rest', async (request, reply) => {
        reply.type('application/json').code(200);
        const data = (await axios(config.OPENWB_URL + '/openWB/web/api.php?get=all')).data;

        for (let key in data) {
            let isNumber = !isNaN(Number(data[key]));

            if (isNumber) data[key] = Number(data[key]);
        }

        return data;
    });

    server.get('/ladelog', async (request, reply) => {
        reply.type('application/json').code(200);

        return {
            log: await getLadelog(),
        };
    });
};

export default loadEndpoints;
