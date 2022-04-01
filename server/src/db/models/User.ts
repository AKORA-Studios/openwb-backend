import config from '../../config';
import { DataTypes, Model } from 'sequelize';
import sequelize from '../mariadb';
import { Tag } from '../../lib/rfid';

interface UserAttributes {
    username: string;
    password: string;
    tagName: Tag.tagName;
    tagCode: Tag.tagCode;
    tagID: Tag.tagID;
    admin: boolean;
}

export interface UserInput extends Omit<UserAttributes, 'tagName'> {
    tagName: string;
}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    declare username: string;
    declare password: string;
    declare tagName: Tag.tagName;
    declare tagCode: Tag.tagCode;
    declare tagID: Tag.tagID;
    declare admin: boolean;
}

User.init(
    {
        username: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        tagName: { type: DataTypes.STRING, allowNull: false },
        tagCode: { type: DataTypes.INTEGER, allowNull: false },
        tagID: { type: DataTypes.BIGINT, allowNull: false },
        admin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    },
    {
        sequelize,
        tableName: 'users',

        indexes: [{ unique: true, fields: ['username', 'password'], name: 'Authentication' }],
    }
);

export default User;

//Save Entry on changes

if (config.PROD) {
} else {
}
