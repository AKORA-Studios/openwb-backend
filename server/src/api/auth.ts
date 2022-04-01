import User from '@db/models/User';
import { createHash } from 'node:crypto';
import { jwtVerify, SignJWT, JWTPayload } from 'jose';
import { generateKeyPair } from 'jose';
import { Tag } from '../lib/rfid';

const keyPair = generateKeyPair('ES256');

export function hash(password: string) {
    return createHash('md5').update(password).digest('hex');
}

export async function createUser(username: string, password: string, tagName: string) {
    const tagID = Tag.getID(tagName);
    const tagCode = Tag.getCode(tagName);

    await User.create({
        username,
        password: hash(password),
        tagName,
        tagCode,
        tagID,
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
    tagCode: number;
    admin: boolean;
}

export async function generateJWT(user: User) {
    return new SignJWT({
        username: user.username,
        tagName: user.tagName,
        tagCode: user.tagCode,
        admin: user.admin,
    })
        .setProtectedHeader({ alg: 'ES256' })
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign((await keyPair).privateKey);
}

export async function validateJWT(token: string) {
    const { payload } = await jwtVerify(token, (await keyPair).publicKey);
    return payload as UserJWTPayload;
}
