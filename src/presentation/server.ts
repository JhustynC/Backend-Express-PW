import express, { Router } from "express";
import * as http from "http";

export interface ServerOptions{
    port: number;
    routes: Router;
}

export class Server {
    private app = express();
    private http?: http.Server;
    private readonly port: number;
    private readonly routes: Router;

    constructor({port, routes}: ServerOptions){
        this.port = port;
        this.routes = routes;
    }

    public async start() {
        
        //* Middlewares        
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        //* Routes
        this.app.use(this.routes);

        //* Start Server
        this.http = this.app.listen(this.port, ()=> {
            console.log(`Server is running\nhttp://localhost:${this.port}`);
        });
    }

    public get httpServer(): http.Server {
        if (!this.http) {
            throw new Error("HTTP server is not running. Please start the server first.");
        }
        return this.http;
    }

    public async stop() {
        try{
            this.http?.close();
            console.log("Server is stopped");
        }catch(error){
            throw `Error: Failed to stop server\n ${error}`;
        }
    }
}