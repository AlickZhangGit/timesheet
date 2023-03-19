import { Request, Response, NextFunction } from "express"
import { DataAPI } from '../controllers/getDataAPI'
import  authJwt  from '../controllers/authJwt'

// api routes
export class Data {

    private apiPath = '/api/v1'
    public dataApi: DataAPI = new DataAPI()

    public routes(app:any): void {
        app.route(this.apiPath + "/test")
            .get(authJwt.verifyToken, this.dataApi.getTest)
        app.route(this.apiPath + "/inserttimes")
            .post(this.dataApi.postTimesData)
        app.route(this.apiPath + "/gettimesbymonth")
            .get(this.dataApi.getTimesByMonth)
    }
}