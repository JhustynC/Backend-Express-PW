import express, { Router, Request, Response, NextFunction } from "express";
import * as http from "http";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";

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
        this.app.use(morgan("dev"));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(compression());
        this.app.use(helmet());

        //* Routes
        this.app.use(this.routes);

        //* Cors
        this.app.use(cors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));

        //* Error Handling
        this.app.use(
            (err: any, req: Request, res: Response, next: NextFunction) => {
                console.error(err);
                res.status(500).json({ message: "Internal Server Error" });
            }
        );

        //* 404 Handling
        this.app.use((req, res) => {
            res.status(404).json({ message: "Not Found" });
        });

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