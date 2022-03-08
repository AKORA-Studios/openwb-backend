import getLiveValues from '../../api/getLiveValues';
import config from '../../config';
import mqttListener from '../../openWB/client';

mqttListener.on('openWB/system/lastlivevalues', async (str) => {
    const values = await getLiveValues();
    if (!values) return;

    if (config.NODE_ENV !== 'production') return;
});

mqttListener.on('openWB/graph/lastlivevalues', (str) => {});
