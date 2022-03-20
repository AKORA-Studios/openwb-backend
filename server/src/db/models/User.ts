import config from '../../config';
import { DataTypes, Model } from 'sequelize';
import sequelize from '../mariadb';
import { generateJWT, hash } from '../../api/auth';

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
    console.log('DEV MODE - Not saving Users');
    User.create({
        admin: true,
        username: 'admin',
        password: hash('admin'),
        tagName: 'A',
        tagID: 0,
        rfid: 123,
    }).then((u) => {
        const jwt = generateJWT(u);
        jwt.then(console.log);
    });
}
