import config from '../config';
import mongoose from 'mongoose';

mongoose.set('debug', true);

export async function connectMongoDB() {
    try {
        await mongoose.connect(config.MONGODB_URL, {
            auth: {
                username: config.MONGODB_ADMIN_USERNAME,
                password: config.MONGODB_ADMIN_PASSWORD,
            },
        });
        console.log('Connected to MongoDB at', config.MONGODB_URL);
    } catch (e) {
        console.log('Error while connecting to MongoDB at', config.MONGODB_URL);
        console.log(e);
        process.exit(1);
    }
}

export default connectMongoDB;
