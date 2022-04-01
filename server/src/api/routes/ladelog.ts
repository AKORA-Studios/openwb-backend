import { UserRequest } from '..';
import LadeLog from '@db/models/Ladelog';
import { MyServer } from '../types';

export const ladelogRoute = (server: MyServer) => {
    server.route({
        url: '/ladelog',
        method: 'GET',
        preHandler: server.auth([server.verifyJWT]),
        handler: async (req: UserRequest, reply) => {
            reply.type('application/json').code(200);
            let tagName = req.params.user.admin ? undefined : req.params.user.tagName;
            let limit = 25;
            if ((req.query as any)['limit']) {
                if (isNaN((req.query as any)['limit'])) throw new Error('Invalid Limit');
                limit = Number((req.query as any)['limit']);
            }

            const where = tagName
                ? {
                      tag: tagName,
                  }
                : {};
            const entries = await LadeLog.findAll({
                where,
                limit,
            });

            return {
                log: entries.map((e) => {
                    const json = e.toJSON();
                    return {
                        ...json,
                        start: json.start.getTime(),
                        ende: json.ende.getTime(),
                    };
                }),
            };
        },
    });
};
export default ladelogRoute;
