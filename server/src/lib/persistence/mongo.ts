import mongoose, {Mongoose, Promise} from 'mongoose';

let uri = 'mongodb://mongo:27017/user';

const connect = async () : Promise<Mongoose> => {
    let db: any = undefined;
    try {
        console.log(`trying to connect to mongodb - ${uri}`);
        db = await mongoose.connect(uri, { useNewUrlParser: true });
        console.log(`connected successfully to mongodb`);
    } catch (error) {
        console.log(`failed to connect to mongodb on mongo container - ${error}`);
        try {
            uri = 'mongodb://localhost:27017/user';
            console.log(`trying to connect to mongodb - ${uri}`);
            await mongoose.connect(uri, { useNewUrlParser: true });
            console.log(`connected successfully to mongodb`);
        } catch (error) {
            console.log(`failed to connect to mongodb on localhost - ${error}`);
            throw error;
        }
    }

    return db;
}

export {
    connect
};
