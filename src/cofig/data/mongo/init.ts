import mongoose from "mongoose";

export interface ConnectionOptions{
    url: string,
    dbName: string
}

export class MongoDatabase {
    static async connect(options: ConnectionOptions): Promise<mongoose.Mongoose> {
        const {url, dbName} = options;
        try{
            const mongodb = await mongoose.connect(url, {dbName: dbName});
            console.log("Connected to MongoDB");
            return mongodb;
        }catch(error){
            throw `Error: Failed to connect to MongoDB\n ${error}`;
        }
    }

    static async disconnect(): Promise<void> {
        await mongoose.disconnect();
    }
}

