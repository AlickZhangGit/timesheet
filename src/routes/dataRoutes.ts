import { Request, Response, NextFunction } from "express"
import { DataAPI } from '../controllers/getDataAPI'
const authJwt = require ('../controllers/authJwt')

// api routes
export class Data {

    private apiPath = '/api/v1'
    public dataApi: DataAPI = new DataAPI()

    public routes(app:any): void {
        app.route(this.apiPath + "/test")
            .post( this.dataApi.postTest)
    }
}