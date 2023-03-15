import express = require("express") 
import { Data } from './routes/dataRoutes';
import { User } from './routes/userRoutes';


const path = require("path")

class App {
    public app: express.Application;
    public routeData: Data = new Data();
    public routeUser: User = new User();

    constructor() {
        this.app = express()
        this.routeData.routes(this.app);
        this.routeUser.routes(this.app);
    }
}

export default new App().app;