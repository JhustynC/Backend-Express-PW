import { Router } from "express";
import { envs } from "./cofig/plugin/envs/envs.plugin";
import { Server } from "./presentation/server";
import { MongoDatabase } from "./cofig/data/mongo/init";
import { AppRoutes } from "./presentation/routes";

(async () => {
    main();
})()

async function main() {

    console.log(envs.PORT);

    //* Database
    await MongoDatabase.connect({
        url: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });

    //* Server
    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    });
    server.start();  
}