import config from '../../config';
import { DataTypes, Model } from 'sequelize';
import sequelize from '../mariadb';
import { Tag } from '../../lib/rfid';
import LadeLog from './Ladelog';

interface UserAttributes {
    username: string;
    password: string;
    tagName: Tag.name;
    tagID: Tag.id;
    admin: boolean;
    chargeMode?: number;
    subMode: number;
    chargeSoc: number;
    chargeAmps: number;
    chargeKwh: number;
}

export interface UserInput extends Omit<UserAttributes, 'tagName'> {
    tagName: string;
}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    declare username: string;
    declare password: string;
    declare tagName: Tag.name;
    declare tagID: Tag.id;
    declare admin: boolean;
    declare chargeMode?: number;
    declare subMode: number;
    declare chargeSoc: number;
    declare chargeAmps: number;
    declare chargeKwh: number;
}

User.init(
    {
        username: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        tagName: { type: DataTypes.STRING, allowNull: false },
        tagID: { type: DataTypes.BIGINT, allowNull: false },
        admin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        chargeMode: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
        subMode: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        chargeSoc: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        chargeAmps: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        chargeKwh: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    },
    {
        sequelize,
        tableName: 'users',

        indexes: [{ unique: true, fields: ['username', 'password'], name: 'Authentication' }],
    }
);
// User.hasMany(LadeLog);

export default User;
