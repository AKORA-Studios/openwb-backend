import { readFileSync, writeFileSync } from 'fs';

function perf(label: string, func: () => any) {
    console.time(label);
    func();
    console.timeEnd(label);
}

//Sort out keys
function filterKeys(arr: string[]): string[] {
    return arr
        .filter((s) => !s.includes('SmartHome'))
        .filter((s) => !s.includes('config'))
        .filter((s) => !s.includes('set'))
        .filter((s) => !s.includes('graph'))
        .filter((s) => !s.includes('Graph'))
        .filter((s) => !/^openWB\/lp\/[2-8]/.test(s));
}

const keys = readFileSync('../../../../test/test.txt')
    .toString()
    .split('\n')
    .map((s) => s.split(' ')[0]);

for (let i = 0; i < 3; i++) {
    //First
    perf('Multiple', () => filterKeys(keys));
}

writeFileSync('../../../../test/short.txt', filterKeys(keys).join('\n'));

console.log(filterKeys(keys).length);
