import { DataTypes, Model } from 'sequelize';
import { carID } from '../../api/getRFID';
import sequelize from '../mariadb';

interface RFIDLogAttributes {
    timestamp: Date;
    tagName: keyof typeof carID;
    tagID: number;
}
export interface RFIDLogInput extends RFIDLogAttributes {}

class RFIDLog extends Model<RFIDLogAttributes, RFIDLogInput> implements RFIDLogAttributes {
    public timestamp!: Date;
    public tagName!: 'A' | 'B' | 'C' | 'D' | 'E';
    public tagID!: number;

    // timestamps!
    // public readonly createdAt!: Date;
    // public readonly updatedAt!: Date;
    // public readonly deletedAt!: Date;
}

RFIDLog.init(
    {
        timestamp: DataTypes.DATE,
        tagName: DataTypes.STRING,
        tagID: DataTypes.INTEGER,
    },
    { sequelize }
);

export default RFIDLog;
