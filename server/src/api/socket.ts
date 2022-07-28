import getLiveValues from '@lib/getLiveValues';
import server from 'index';
import mqttListener from 'openWB/client';

mqttListener.on('openWB/system/lastlivevalues', async (str) => {
    const values = await getLiveValues();

    server.io.emit('values', values);
});
