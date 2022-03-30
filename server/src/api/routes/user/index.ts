import { MyServer } from '../../endpoints';
import meRoute from './@me';
import allRoute from './all';

export default (server: MyServer) => {
    server.register(
        (server, opts, done) => {
            meRoute(server);
            allRoute(server);

            done();
        },
        { prefix: '/user' }
    );
};
