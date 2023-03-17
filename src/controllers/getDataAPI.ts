import {Request, Response, NextFunction} from 'express'
import  dbConnect  from '../controllers/dbConnect'
const $sql = require ('./queries')


const dotenv = require('dotenv')
dotenv.config({ path: './.env'})


// display error on error, use msg to pinpoint which function failed
let resError = (res: any, err: any, msg: any) => {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 500;
    res.send({
        status: 'Error: '.concat(msg),
        code: err.code
    });
}


export class DataAPI {
    async postTest(req: Request, res: Response){
        let id = req.query.id;

        // do the query
        dbConnect.pool.query('SELECT * FROM users WHERE id = ?', [id], function (err, result) {

            // return if query error
            if (err) {
                console.error(err);
                resError(res, err, 'postLogin');

            // return on success
            } else {
                res.statusCode = 201;
                res.send({
                    success: true,
                    status: 201,
                    message: result
                });
            }
        });
    }
}