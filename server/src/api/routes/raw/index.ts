import { MyServer } from '../../endpoints';
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
