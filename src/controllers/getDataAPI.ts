import {Request, Response, NextFunction} from 'express'
import  dbConnect  from '../controllers/dbConnect'
const $sql = require ('./queries')


const dotenv = require('dotenv')
dotenv.config({ path: './.env'})


// display error on error, use msg to pinpoint which function failed
let resError = (res: any, err: any, statusCode=501) => {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = statusCode;
    res.send({
        status: err,
        code: err.code
    });
}


export class DataAPI {
    async postTest(req: Request, res: Response){
        let id = req.query.id;

        try {

            // do the query
            const results = await dbConnect.pool.query($sql.queries.test, [id])

            res.statusCode = 201;
            res.send({
                success: true,
                status: 201,
                message: results.rows
            });

        } catch(err){
            resError(res, err);
        }
    }
}