import { Router } from "express";
import { envs } from "./cofig/plugin/envs/envs.plugin";
import { Server } from "./presentation/server";
import { MongoDatabase } from "./cofig/data/mongo/init";

(async () => {
    main();
})()


async function main() {

    //* Database
    await MongoDatabase.connect({
        url: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });

    //* Server
    const server = new Server({
        port: envs.PORT,
        routes: Router()
    });
    server.start();  
}