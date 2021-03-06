import { findUser, generateJWT } from '../auth';
import { MyServer, UserReply, UserRequest } from '../types';
import S from 'fluent-json-schema';

const bodyJsonSchema = S.object()
    .prop('username', S.string().required())
    .prop('password', S.string().required());

// Note that there is no need to call `.valueOf()`!
const schema = {
    body: bodyJsonSchema,
};

export const loginRoute = (server: MyServer) => {
    server.route({
        url: '/login',
        method: 'POST',
        schema,
        handler: async (req: UserRequest, repl: UserReply) => {
            const muser = await findUser((req.body as any).username, (req.body as any).password);

            if (!muser) {
                repl.code(403);
                return { message: 'Invalid Credentials' };
            }

            return await generateJWT(muser);
        },
    });
};

export default loginRoute;
