import { DataTypes, Model } from 'sequelize';
import sequelize from '../mariadb';
import config from '../../config';
import { getLadelog, Tag } from '../../lib';

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
    tagName: Tag.tagName;
    tagCode: Tag.tagCode;
    tagID: Tag.tagID;
}
export interface LadeLogInput extends Omit<LadeLogAttributes, 'tagName'> {
    tagName: string;
}

class LadeLog extends Model<LadeLogAttributes, LadeLogInput> implements LadeLogAttributes {
    declare timestamp: Date;

    /** Date in UTC */
    declare start: Date;
    /** Date in UTC */
    declare ende: Date;
    declare km: number;
    declare kWh: number;
    declare kW: number;
    declare ladepunkt: string;
    declare modus: number;
    declare tagName: Tag.tagName;
    declare tagCode: Tag.tagCode;
    declare tagID: Tag.tagID;

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
        kWh: DataTypes.FLOAT,
        kW: DataTypes.FLOAT,
        ladepunkt: DataTypes.STRING,
        modus: DataTypes.INTEGER,
        tagName: DataTypes.STRING,
        tagCode: DataTypes.INTEGER,
        tagID: DataTypes.BIGINT,
    },
    {
        sequelize,
        tableName: 'lade_log',

        indexes: [
            { unique: true, fields: ['start', 'ende'], name: 'Time' },
            { unique: false, fields: ['tagName', 'tagID', 'tagCode'], name: 'Tag' },
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
