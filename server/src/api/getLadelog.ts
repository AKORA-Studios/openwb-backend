import axios from 'axios';
import config from '../config';
import { parseString } from 'fast-csv';

export async function getLadelog() {
    const thisMonth = new Date(),
        lastMonth = new Date(thisMonth.getTime() - (1000 * 60 * 60 * 24 * 365) / 12);

    const thisLog = await parseCSV(await downloadCSV(thisMonth)),
        lastLog = await parseCSV(await downloadCSV(lastMonth));

    return [...lastLog, ...thisLog];
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
    return axios(
        `${config.OPENWB_URL}/openWB/web/logging/data/ladelog/${date.getFullYear()}${date.getMonth()}.csv`
    ).then((r) => r.data);
}
