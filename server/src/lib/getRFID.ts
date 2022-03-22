import { getKey } from '../db/redis';

export enum carID {
    A = 3038948522,
    B = 3038331354,
    C = 3041372218,
    D = 3038576810,
    E = 3039829114,
}
'A'.charCodeAt(0);

export async function getRFID() {
    let value = (await getKey('openWB/system/lastRfId')) as string;
    if (!value)
        return {
            enabled: true,
            tagName: null,
            date: new Date(),
        };

    let [lastID, millies] = value.split(','),
        tagName = carID[lastID as any];
    return {
        enabled: (await getKey('openWB/global/rfidConfigured')) !== '0',
        tagName,
        tagCode: tagName.charCodeAt(0) - 65,
        date: Number(millies) * 1000,
    };
}

export default getRFID;
