import { DataTypes, Model } from 'sequelize';
import sequelize from '../mariadb';
import getRFID, { carID } from '../../api/getRFID';
import config from '../../config';
import mqttListener from '../../openWB/client';

interface RFIDLogAttributes {
    timestamp: Date;
    tagName: keyof typeof carID;
    tagID: number;
    tagCode: number;
}
export interface RFIDLogInput extends Omit<RFIDLogAttributes, 'tagName'> {
    tagName: string;
}

type Tag = 'A' | 'B' | 'C' | 'D' | 'E';
class RFIDLog extends Model<RFIDLogAttributes, RFIDLogInput> implements RFIDLogAttributes {
    declare timestamp: Date;
    declare tagName: Tag;
    declare tagID: number;
    declare tagCode: number;

    // timestamps!
    // public readonly createdAt!: Date;
    // public readonly updatedAt!: Date;
    // public readonly deletedAt!: Date;
}

RFIDLog.init(
    {
        timestamp: DataTypes.DATE,
        tagName: DataTypes.STRING,
        tagID: DataTypes.BIGINT,
        tagCode: DataTypes.INTEGER,
    },
    { sequelize, tableName: 'rfid_log' }
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
            timestamp: values.date,
            tagName: values.tagName as any,
            tagID: carID[values.tagName as any] as any,
            tagCode: values.tagCode,
        });
        console.log('Saved RFID Log');
    });
} else {
    console.log('DEV MODE - Not saving RFIDLog');
}
