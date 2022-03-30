import redisClient, { getKey } from '../../db/redis';
import { MyServer } from '../endpoints';

export const keyRoute = (server: MyServer) => {
    server.route({
        url: '/keys',
        method: 'GET',
        preHandler: server.auth([server.verifyJWT]),
        handler: async (request, reply) => {
            reply.type('application/json').code(200);

            const start = new Date().getTime();

            let keys = (await redisClient.keys('*')).sort();
            let obj = {} as any;
            for (let key of keys) obj[key] = await getKey(key);

            const timeDiff = new Date().getTime() - start;
            obj.time = timeDiff;

            return obj;
        },
    });
};
export default keyRoute;
