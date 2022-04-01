import { MyServer } from '../types';
import globalsRoute from './globals';
import ladelogRoute from './ladelog';
import lademodusRoute from './lademodus';
import loginRoute from './login';
import rfidRoute from './rfid';
import valuesRoute from './values';
import verbrauchRoute from './verbrauch';

//Registe subroutes
import registerUserRoutes from './user';
import registerRawRoutes from './raw';

export default (server: MyServer) => {
    globalsRoute(server);
    ladelogRoute(server);
    lademodusRoute(server);
    loginRoute(server);
    rfidRoute(server);
    valuesRoute(server);
    verbrauchRoute(server);

    // - /user
    registerUserRoutes(server);
    // - /raw
    registerRawRoutes(server);
};
