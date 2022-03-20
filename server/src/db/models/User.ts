import config from '../../config';
import { DataTypes, Model } from 'sequelize';
import sequelize from '../mariadb';

interface UserAttributes {
    username: string;
    password: string;
    tagName: string;
    tagID: number;
    rfid: number;
}
export interface UserInput extends UserAttributes {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    declare username: string;
    declare password: string;
    declare tagName: string;
    declare tagID: number;
    declare rfid: number;
}

User.init(
    {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        tagName: DataTypes.STRING,
        tagID: DataTypes.INTEGER,
        rfid: DataTypes.BIGINT,
    },
    { sequelize, tableName: 'graph' }
);

export default User;

//Save Entry on changes

if (config.PROD) {
} else {
    console.log('DEV MODE - Not saving GraphValues');
}
