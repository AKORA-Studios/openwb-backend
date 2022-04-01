import { getKey } from '../db/redis';
import { Tag } from './rfid';

export async function getRFID() {
    try {
        let value = (await getKey('openWB/system/lastRfId')) as string;
        if (value === '0') {
            return {
                enabled: true,
                tagName: null,
                date: new Date().getTime(),
            };
        }

        let [lastIDstr, millies] = value.split(',');
        let lastID = Number(lastIDstr);
        return {
            enabled: (await getKey('openWB/global/rfidConfigured')) !== '0',
            tagName: Tag.getName(lastID),
            tagCode: Tag.getCode(lastID),
            tagID: lastID,
            date: Number(millies) * 1000,
        };
    } catch (e) {
        console.log(e);
        return {
            enabled: true,
            tagName: null,
            tagCode: null,
            tagID: null,
            date: new Date().getTime(),
        };
    }
}

export default getRFID;
