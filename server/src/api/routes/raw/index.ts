import { MyServer } from '../../types';
import keysRoute from './keys';
import RESTRoute from './rest';

export default (server: MyServer) => {
    server.register(
        (server, opts, done) => {
            keysRoute(server);
            RESTRoute(server);

            done();
        },
        { prefix: '/raw' }
    );
};
