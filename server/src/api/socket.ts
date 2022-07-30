import getLiveValues from '@lib/getLiveValues';
import server from '../index';
import mqttListener from '../openWB/client';
import { validateJWT } from './auth';

export function setupSocketIO() {
    server.io.on('connection', (socket) => {
        //Do something with the connection
        //Auth and stuff
        socket.on('authenticate', async (token) => {
            try {
                let userData = await validateJWT(token);
                socket.join('users');

                if (userData.admin) {
                    socket.join('admins');
                }
            } catch (err) {}
        });
    });

    mqttListener.on('openWB/system/lastlivevalues', async (str) => {
        const values = await getLiveValues();

        server.io.to('users').emit('users:values', values);
    });
}
