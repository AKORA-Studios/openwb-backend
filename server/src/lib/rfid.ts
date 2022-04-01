export namespace Tag {
    export enum IDMap {
        A = 3038948522,
        B = 3038331354,
        C = 3041372218,
        D = 3038576810,
        E = 3039829114,
    }

    export const idList = [3038948522, 3038331354, 3041372218, 3038576810, 3039829114];

    /** Refers to the imprinted name, like "A" */
    export type tagName = keyof typeof IDMap;
    /** Refers to the n-th of the tags, like 1 */
    export type tagCode = number;
    /** Refers to the actual RFID itself, shouldnt be published */
    export type tagID = number;
    export type TagResolveable = string | number;

    export function getCode(from: TagResolveable): tagCode {
        return idList.indexOf(getID(from));
    }

    export function getName(from: TagResolveable): tagName {
        return IDMap[getID(from)] as any;
    }

    export function getID(from: TagResolveable): tagID {
        if (typeof from === 'string') {
            return IDMap[from as any] as any as number;
        } else if (typeof from === 'number') {
            if (from < 6) {
                //tagCode
                return idList[from];
            } else {
                //tagID
                return from;
            }
        } else {
            throw new Error(`Cannot convert "${from}" to a valid tagID`);
        }
    }
}
