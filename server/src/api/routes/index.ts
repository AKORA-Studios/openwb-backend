import { MyServer } from '../endpoints';
import globalsRoute from './globals';
import keyRoute from './keys';
import ladelogRoute from './ladelog';
import lademodusRoute from './lademodus';
import ladepunktRoute from './ladepunkt';
//import ladestromRoute from './ladestrom';
import loginRoute from './login';
import restRoute from './rest';
import rfidRoute from './rfid';
import valuesRoute from './values';
import verbrauchRoute from './verbrauch';
import registerUserRoutes from './user';

export default (server: MyServer) => {
    globalsRoute(server);
    keyRoute(server);
    ladelogRoute(server);
    lademodusRoute(server);
    ladepunktRoute(server);
    //ladestromRoute(server);
    loginRoute(server);
    restRoute(server);
    rfidRoute(server);
    valuesRoute(server);
    verbrauchRoute(server);

    registerUserRoutes(server);
};
