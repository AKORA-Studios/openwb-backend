import { writeFile, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const keylist = join(__dirname, '..', 'src/db/gateways/keylist.txt'),
    keyFile = join(__dirname, '..', 'src/db/gateways/keylist.txt');
async function convertKeylist() {
    let keys = (await readFile(keylist))
        .toString('utf8')
        .split('\n')
        .map((k) => k.split(' '));

    const mapping = keys.map(([k, type]) => ({ key: k, mapped: k.replaceAll('/', '_'), type }));

    let str = "import { DataTypes } from 'sequelize';";
    str += mapping.map((d) => `    '${d.key}': { name: '${d.mapped}', type: DataTypes.${d.type.toUpperCase()} },`);
}
