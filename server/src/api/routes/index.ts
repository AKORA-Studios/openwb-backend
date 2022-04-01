import { MyServer } from '../endpoints';
import globalsRoute from './globals';
import ladelogRoute from './ladelog';
import lademodusRoute from './lademodus';
//import ladestromRoute from './ladestrom';
import loginRoute from './login';
import restRoute from './raw/rest';
import rfidRoute from './rfid';
import valuesRoute from './values';
import verbrauchRoute from './verbrauch';
import registerUserRoutes from './user';
import registerRawRoutes from './raw';

export default (server: MyServer) => {
    globalsRoute(server);
    ladelogRoute(server);
    lademodusRoute(server);
    loginRoute(server);
    restRoute(server);
    rfidRoute(server);
    valuesRoute(server);
    verbrauchRoute(server);

    // - /user
    registerUserRoutes(server);
    // - /raw
    registerRawRoutes(server);
};
