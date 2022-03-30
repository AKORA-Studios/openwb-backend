import { MyServer } from '../../endpoints';
import meRoute from './@me';

export default (server: MyServer) => {
    server.register(
        (server, opts, done) => {
            meRoute(server);

            done();
        },
        { prefix: '/user' }
    );
};
