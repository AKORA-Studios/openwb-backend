import axios from 'axios';
import config from '../config';
import { parseString } from 'fast-csv';
import { DateTime } from 'luxon';
import { Tag } from './rfid';

type Row = {
    /** Date in millis */
    start: number;
    /** Date in millis */
    ende: number;
    km: number;
    kWh: number;
    kW: number;
    dauer: any;
    ladepunkt: any;
    modus: number;
    // tagName: Tag.tagName;
    // tagCode: Tag.tagCode;
    tagID: Tag.id;
};

export async function getLadelog() {
    const thisMonth = new Date(),
        lastMonth = new Date(thisMonth.getTime() - (1000 * 60 * 60 * 24 * 365) / 12);

    const [thisCSV, lastCSV] = await Promise.all([downloadCSV(thisMonth), downloadCSV(lastMonth)]);

    const thisLog = await parseCSV(thisCSV),
        lastLog = await parseCSV(lastCSV);

    return [...thisLog, ...lastLog];
}
export default getLadelog;

/** Parse CSV String and return as 2D Array  */
function parseCSV(str: string): Promise<Row[]> {
    return new Promise((res, rej) => {
        const arr: Row[] = [];
        parseString(str, {
            headers: false,
        })
            .on('error', (err) => rej(err))
            .on('data', (row) => {
                if (row.length === 0) return;
                arr.push({
                    start: DateTime.fromFormat(row[0], 'dd.MM.yy-HH:mm').toMillis(),
                    ende: DateTime.fromFormat(row[1], 'dd.MM.yy-HH:mm').toMillis(),
                    km: Number(row[2]),
                    kWh: Number(row[3]),
                    kW: Number(row[4]),
                    dauer: row[5],
                    ladepunkt: row[6],
                    modus: Number(row[7]),
                    //tagName: Tag.getName(Number(row[8])),
                    //tagCode: Tag.getCode(Number(row[8])),
                    tagID: Number(row[8]),
                });
            })
            .on('end', () => res(arr));
    });
}

/** Returns CSV string for date example 20223 */
async function downloadCSV(date: Date): Promise<string> {
    const filename = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    const url = `${config.OPENWB_URL}/openWB/web/logging/data/ladelog/${filename}.csv`;
    const r = await axios(url);
    return r.data;
}
