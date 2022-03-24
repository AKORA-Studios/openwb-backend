import { DataTypes, Model } from 'sequelize';
import sequelize from '../mariadb';
import { carID } from '../../lib/getRFID';
import config from '../../config';
import { getLadelog } from '../../lib';

interface LadeLogAttributes {
    /** Date in UTC */
    start: Date;
    /** Date in UTC */
    ende: Date;
    km: number;
    kWh: number;
    kW: number;
    ladepunkt: string;
    modus: number;
    tag: keyof typeof carID;
    tagID: number;
    tagCode: number;
}
export interface LadeLogInput extends Omit<LadeLogAttributes, 'tag'> {
    tag: string;
}

type Tag = 'A' | 'B' | 'C' | 'D' | 'E';
class LadeLog extends Model<LadeLogAttributes, LadeLogInput> implements LadeLogAttributes {
    declare timestamp: Date;
    declare tagName: Tag;

    /** Date in UTC */
    declare start: Date;
    /** Date in UTC */
    declare ende: Date;
    declare km: number;
    declare kWh: number;
    declare kW: number;
    declare ladepunkt: string;
    declare modus: number;
    declare tag: keyof typeof carID;
    declare tagID: number;
    declare tagCode: number;

    // timestamps!
    // public readonly createdAt!: Date;
    // public readonly updatedAt!: Date;
    // public readonly deletedAt!: Date;
}

LadeLog.init(
    {
        start: DataTypes.DATE,
        ende: DataTypes.DATE,
        km: DataTypes.INTEGER,
        kWh: DataTypes.INTEGER,
        kW: DataTypes.INTEGER,
        ladepunkt: DataTypes.DATE,
        modus: DataTypes.DATE,
        tag: DataTypes.STRING,
        tagID: DataTypes.BIGINT,
        tagCode: DataTypes.INTEGER,
    },
    {
        sequelize,
        tableName: 'lade_log',

        indexes: [
            { unique: true, fields: ['start', 'ende'], name: 'Time' },
            { unique: false, fields: ['tag', 'tagID', 'tagCode'], name: 'Tag' },
        ],
    }
);

export default LadeLog;

//Save Entry on changes
if (config.PROD) {
    setInterval(async () => {
        const logEntrys = (await getLadelog()).map((l) => ({
            ...l,
            start: new Date(l.start),
            ende: new Date(l.ende),
        }));

        for (let log of logEntrys) {
            if (!(await LadeLog.findOne({ where: { start: log.start, ende: log.ende } }))) {
                await LadeLog.create(log);
            }
        }
    }, 1000 * 60); //Every Minute
} else {
    console.log('DEV MODE - Not saving LadeLog');
}
