import { Request, Response, NextFunction } from "express"
import { FrontRoute } from '../controllers/getFront'
<<<<<<< HEAD
import  authJwt  from '../controllers/authJwt'
=======
import  authJwt  from '../middleware/authJwt'
>>>>>>> 66b028c (middleware folder)

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