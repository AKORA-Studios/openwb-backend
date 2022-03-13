import axios from 'axios';
import config from '../config';
import { parseString } from 'fast-csv';
import { carID } from './getRFID';
import { DateTime } from 'luxon';

type Row = [Date, Date, number, number, number, string, number, keyof typeof carID];

export async function getLadelog() {
    const thisMonth = new Date(),
        lastMonth = new Date(thisMonth.getTime() - (1000 * 60 * 60 * 24 * 365) / 12);

    const [thisCSV, lastCSV] = await Promise.all([downloadCSV(thisMonth), downloadCSV(lastMonth)]);

    const thisLog = await parseCSV<any[]>(thisCSV),
        lastLog = await parseCSV<any[]>(lastCSV);

    return [...thisLog, ...lastLog].filter((r) => r.length > 0);
}

/** Parse CSV String and return as 2D Array  */
function parseCSV<TRow>(str: string): Promise<TRow[]> {
    return new Promise((res, rej) => {
        const arr: TRow[] = [];
        parseString(str, {
            headers: false,
        })
            .on('error', (err) => rej(err))
            .on('data', (row) => {
                console.log(JSON.stringify(row));
                return {
                    start: DateTime.fromFormat(row[0], 'dd.MM.yy-HH:mm').toJSDate(),
                    ende: DateTime.fromFormat(row[1], 'dd.MM.yy-HH:mm').toJSDate(),
                    km: Number(row[2]),
                    kWh: Number(row[3]),
                    kW: Number(row[4]),
                    dauer: row[5],
                    ladepunkt: row[6],
                    modus: Number(row[7]),
                    tag: carID[row[8]],
                };
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
