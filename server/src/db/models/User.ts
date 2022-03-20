import config from '../../config';
import { DataTypes, Model } from 'sequelize';
import sequelize from '../mariadb';

interface UserAttributes {
    username: string;
    password: string;
    tagName: string;
    tagID: number;
    rfid: number;

    admin: boolean;
}
export interface UserInput extends UserAttributes {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    declare username: string;
    declare password: string;
    declare tagName: string;
    declare tagID: number;
    declare rfid: number;
    declare admin: boolean;
}

User.init(
    {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        tagName: DataTypes.STRING,
        tagID: DataTypes.INTEGER,
        rfid: DataTypes.BIGINT,
        admin: DataTypes.BOOLEAN,
    },
    { sequelize, tableName: 'graph' }
);

export default User;

//Save Entry on changes

if (config.PROD) {
} else {
    console.log('DEV MODE - Not saving Users');
}
