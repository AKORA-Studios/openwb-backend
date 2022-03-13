import axios from 'axios';
import config from '../config';
import { parseString } from 'fast-csv';

type RawRow = [string, string, string, string, string, string, string, string];

export async function getLadelog() {
    const thisMonth = new Date(),
        lastMonth = new Date(thisMonth.getTime() - (1000 * 60 * 60 * 24 * 365) / 12);

    const [thisCSV, lastCSV] = await Promise.all([downloadCSV(thisMonth), downloadCSV(lastMonth)]);
    console.log(thisMonth, thisCSV);
    console.log(lastMonth, lastCSV);

    const thisLog = await parseCSV<RawRow>(thisCSV),
        lastLog = await parseCSV<RawRow>(lastCSV);

    return [...lastLog, ...thisLog].filter((r) => r.length > 0);
}

/** Parse CSV String and return as 2D Array  */
function parseCSV<TRow>(str: string): Promise<TRow[]> {
    return new Promise((res, rej) => {
        const arr: TRow[] = [];
        parseString(str, {
            headers: false,
        })
            .on('error', (err) => rej(err))
            .on('data', (row) => arr.push(row))
            .on('end', () => res(arr));
    });
}

/** Returns CSV string for date example 20223 */
function downloadCSV(date: Date): Promise<string> {
    const filename = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    const url = `${config.OPENWB_URL}/openWB/web/logging/data/ladelog/${filename}.csv`;
    console.log('Downloading:', url);
    return axios(url).then((r) => r.data);
}
