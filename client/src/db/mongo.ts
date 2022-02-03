import config from '../config';
import mongoose from 'mongoose';

mongoose.set('debug', true);

var promiseResolve: (value: unknown) => void,
    promiseReject: (reason?: any) => void;
export var mongoReady = new Promise(function (resolve, reject) {
    promiseResolve = resolve;
    promiseReject = reject;
});

export async function connectMongoDB() {
    try {
        await mongoose.connect(config.MONGODB_URL, {
            auth: {
                username: config.MONGODB_ADMIN_USERNAME,
                password: config.MONGODB_ADMIN_PASSWORD,
            },
        });
        console.log('Connected to MongoDB at', config.MONGODB_URL);
        promiseResolve(true);
    } catch (e: any) {
        //console.log('Error while connecting to MongoDB at', config.MONGODB_URL);
        //console.log(e);
        promiseReject();
        throw new Error('MongoDB unable to connect to ' + config.MONGODB_URL); //, {cause: e});
    }
}

export async function disconnectMongoDB() {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
}
