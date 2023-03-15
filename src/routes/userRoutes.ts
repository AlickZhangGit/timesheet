import { Request, Response, NextFunction } from "express"
import { UserAPI } from '../controllers/getUserAPI'

// front end routes
export class User {

    private apiPath = '/api/v1'
    public userApi: UserAPI = new UserAPI()

    public routes(app:any): void {
        app.route(this.apiPath + "/register")
            .post(this.userApi.register)
        app.route(this.apiPath + "/login")
            .post(this.userApi.login)
    }
}