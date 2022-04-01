import { DataTypes, Model } from 'sequelize';
import sequelize from '../mariadb';
import config from '../../config';
import mqttListener from '../../openWB/client';
import { Tag } from '../../lib/';

interface RFIDLogAttributes {
    timestamp: Date;
    tagName: Tag.tagName;
    tagCode: Tag.tagCode;
    tagID: Tag.tagID;
}
export interface RFIDLogInput extends Omit<RFIDLogAttributes, 'tagName'> {
    tagName: string;
}

class RFIDLog extends Model<RFIDLogAttributes, RFIDLogInput> implements RFIDLogAttributes {
    declare timestamp: Date;
    declare tagName: Tag.tagName;
    declare tagCode: Tag.tagCode;
    declare tagID: Tag.tagID;
}

RFIDLog.init(
    {
        timestamp: { type: DataTypes.DATE, allowNull: false, primaryKey: true },
        tagName: { type: DataTypes.STRING, allowNull: false },
        tagID: { type: DataTypes.BIGINT, allowNull: false },
        tagCode: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
        sequelize,
        tableName: 'rfid_log',
        indexes: [{ unique: true, fields: ['timestamp'], name: 'Time' }],
    }
);

export default RFIDLog;

//Save Entry on changes
if (config.PROD) {
    let first = true;
    mqttListener.on('openWB/system/lastRfId', async (value) => {
        if (config.DEV) return;
        if (first) {
            first = false;
            return;
        }

        if (!value) return;
        if (value[0] === '0') return;

        let [lastIDstr, millies] = value[0].split(',');
        let lastID = Number(lastIDstr);

        await RFIDLog.create({
            tagName: Tag.getName(lastID),
            tagCode: Tag.getCode(lastID),
            tagID: lastID,
            timestamp: new Date(Number(millies) * 1000),
        });
    });
} else {
    console.log('DEV MODE - Not saving RFIDLog');
}
