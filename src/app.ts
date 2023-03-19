import express from "express";
import session, {SessionOptions} from "express-session";
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import cors from "cors"

import { Data } from './routes/dataRoutes';
import { User } from './routes/userRoutes';
import { Front } from './routes/frontRoutes';

import dotenv from 'dotenv'

dotenv.config({ path: './.env'})

class App {
    public app: express.Application;
    public routeData: Data = new Data();
    public routeUser: User = new User();
    public routeFront: Front = new Front();

    constructor() {
        this.app = express()

        // Set up session middleware
        const sessionOptions: SessionOptions = {
            secret: process.env.SESSION_SECRET || "",
            resave: false,
            saveUninitialized: false,
            cookie: { 
                maxAge: 24 * 60 * 60 * 1000 // 24 hour
            }
        };
        this.app.use(session(sessionOptions));

        // Set up cookie parser middleware
        this.app.use(cookieParser());

        // Set up body-parser middleware to handle JSON data
        this.app.use(bodyParser.json());

        // Set up cors middleware
        this.app.use(cors());

        this.routeData.routes(this.app);
        this.routeUser.routes(this.app);
        this.routeFront.routes(this.app);
    }
}


export default new App().app;