import User from '../db/models/User';
import { carID } from '../lib/getRFID';
import { createHash } from 'node:crypto';
import { jwtVerify, SignJWT, JWTPayload } from 'jose';
import config from '../config';

export function hash(password: string) {
    return createHash('md5').update(password).digest('hex');
}

export async function createUser(username: string, password: string, tagName: string) {
    const rfid = carID[tagName as any] as any as number;
    const tagCode = tagName.charCodeAt(0) - 65;

    await User.create({
        username,
        password: hash(password),
        rfid,
        tagID: tagCode,
        tagName,
        admin: false,
    });
}

export function findUser(username: string, password: string) {
    const passHash = hash(password);

    return User.findOne({
        where: {
            username,
            password: passHash,
        },
    });
}

//
//
//
//
//   JWT
//
//
//

export interface UserJWTPayload extends JWTPayload {
    username: string;
    tagName: string;
    tagID: number;
    admin: boolean;
}

export function generateJWT(user: User) {
    return new SignJWT({
        username: user.username,
        tagName: user.tagName,
        tagID: user.tagID,
        admin: user.admin,
    })
        .setProtectedHeader({ alg: 'ES256' })
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(Buffer.from(config.JWT_SECRET));
}

export async function validateJWT(token: string) {
    const { payload } = await jwtVerify(token, Buffer.from(config.JWT_SECRET));
    return payload as UserJWTPayload;
}
