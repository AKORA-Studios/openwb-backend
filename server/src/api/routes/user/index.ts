import { MyServer } from '../../types';
import meRoute from './@me';
import allRoute from './all';
import updateRoute from './update';

export default (server: MyServer) => {
    server.register(
        (server, opts, done) => {
            meRoute(server);
            allRoute(server);
            updateRoute(server);

            done();
        },
        { prefix: '/user' }
    );
};
