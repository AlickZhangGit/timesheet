import { Request, Response, NextFunction } from "express"
import { DataAPI } from '../controllers/getDataAPI'
import  authJwt  from '../middleware/authJwt'

// api routes
export class Data {

    private apiPath = '/api/v1'
    public dataApi: DataAPI = new DataAPI()

    public routes(app:any): void {
        app.route(this.apiPath + "/test")
            .post(authJwt.verifyToken, this.dataApi.getTest)
        app.route(this.apiPath + "/inserttimes")
            .post(authJwt.verifyToken, this.dataApi.postTimesData)
        app.route(this.apiPath + "/gettimesbymonth")
            .get(authJwt.verifyToken, this.dataApi.getTimesByMonth)
    }
}