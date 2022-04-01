import { MyServer } from '../../types';
import globalsRoute from './globals';
import ladepunktRoute from './ladepunkt';
import verbrauchRoute from './verbrauch';

export default (server: MyServer) => {
    server.register(
        (server, opts, done) => {
            globalsRoute(server);
            ladepunktRoute(server);
            verbrauchRoute(server);

            done();
        },
        { prefix: '/details' }
    );
};
