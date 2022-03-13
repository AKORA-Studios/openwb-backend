import axios from 'axios';
import { FastifyPluginCallback } from 'fastify';
import config from '../config';
import { getKey } from '../db/redis';
import getGlobals from './getGlobals';
import getLadepunkt from './getLadepunkt';
import getLiveValues from './getLiveValues';
import getRFID from './getRFID';
import getVerbrauch from './getVerbrauch';

export const api: FastifyPluginCallback = function (server, opts, done) {
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

    /*
    server.get('/metrics', async (request, reply) => {
        reply.type('text/plain').code(200);
        return await getMetrics();
    });
    */

    done();
};

export default api;
