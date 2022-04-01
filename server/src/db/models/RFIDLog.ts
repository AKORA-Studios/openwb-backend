import { DataTypes, Model } from 'sequelize';
import sequelize from '../mariadb';
import getRFID from '../../lib/getRFID';
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
    mqttListener.on('openWB/system/lastRfId', async (str) => {
        if (config.DEV) return;
        if (first) {
            first = false;
            return;
        }

        //Get new values from redis
        const values = await getRFID();
        if (!values) return;
        if (!values.tagName || !values.enabled) return;

        await RFIDLog.create({
            timestamp: new Date(values.date),
            tagName: values.tagName,
            tagCode: values.tagCode,
            tagID: values.tagID,
        });
    });
} else {
    console.log('DEV MODE - Not saving RFIDLog');
}
