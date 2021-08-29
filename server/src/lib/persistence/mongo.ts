import mongoose, { Mongoose, Promise } from 'mongoose';
import { LOGGER } from '../logger';

let uri = 'mongodb://mongo:27017/user';

const connect = async () : Promise<Mongoose> => {
    let db: any;
    try {
        LOGGER.info(`trying to connect to mongodb - ${uri}`);
        db = await mongoose.connect(uri, { useNewUrlParser: true });
        LOGGER.info('connected successfully to mongodb');
    } catch (error: any) {
        LOGGER.info(`failed to connect to mongodb on mongo container - ${JSON.stringify(error.stack)}`);
        try {
            uri = 'mongodb://localhost:27017/user';
            LOGGER.info(`trying to connect to mongodb - ${uri}`);
            await mongoose.connect(uri, { useNewUrlParser: true });
            LOGGER.info('connected successfully to mongodb');
        } catch (err: any) {
            LOGGER.error(`failed to connect to mongodb on localhost - ${JSON.stringify(err.stack)}`);
            throw err;
        }
    }

    return db;
};

export {
    connect,
};
