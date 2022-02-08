import { DateTime } from 'luxon';
import { getKey } from '../db/redis';

enum carID {
    A = 3038948522,
    B = 3038331354,
    C = 3041372218,
    D = 3038576810,
    E = 3039829114,
}

export async function getRFID() {
    let [lastID, millies] = (await getKey('openWB/global/openWB/lp/1/lastRfId')).split(','),
        tagName = carID[lastID];
    return {
        enabled: (await getKey('openWB/global/rfidConfigured')) !== '0',
        tagName,
        date: DateTime.fromMillis(Number(millies) * 1000).toJSDate(),
    };
}

export default getRFID;
