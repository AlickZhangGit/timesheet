import { Request, Response, NextFunction } from "express"
import { FrontRoute } from '../controllers/getFront'
import  authJwt  from '../controllers/authJwt'

// api routes
export class Front {
    public front: FrontRoute = new FrontRoute()

    public routes(app:any): void {
        
        app.route("/")
            .get(this.front.getHome)
        app.route("/assets/*")
            .get(this.front.assetsIndex)
        
        app.route("/*")
            .get(this.front.getHome)
    }
}