import { FastifyPluginCallback } from 'fastify';
import loadEndpoints from './endpoints';

export const api: FastifyPluginCallback = function (server, opts, done) {
    loadEndpoints(server, opts, done);

    done();
};

export default api;
