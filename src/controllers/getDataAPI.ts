import {Request, Response, NextFunction} from 'express'
import { Session } from 'express-session';
import  dbConnect  from '../controllers/dbConnect'
const $sql = require ('./queries')

const dotenv = require('dotenv')
dotenv.config({ path: './.env'})


// display error on error, use msg to pinpoint which function failed
const resError = (res: any, err: any, statusCode=501) => {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = statusCode;
    res.send({
        status: err,
        code: err.code
    });
}

interface timesData {
    email: string;
    year: string;
    month: string;
    day: string;
    hours: string;
}

function jsonToList(jsonData){
    return new Promise((resolve, reject)=>{
        try{
            const rows:timesData[] = jsonData
            const values = rows.map(row => `('${row.email}', '${row.year}', '${row.month}', '${row.day}', '${row.hours}')`).join(', ');
            resolve(values)
        }catch(err){
            reject('Error parsing data to list')
        }
    })
}


export class DataAPI {
    async getTest(req: Request, res: Response){
        const email = req.session.email;

        try {

            // do the query
            // const results = await dbConnect.pool.query($sql.queries.test, [id])

            res.statusCode = 201;
            res.send({
                success: true,
                status: 201,
                message: email
            });

        } catch(err){
            resError(res, err);
        }
    }

    async postTimesData(req: Request, res: Response){
        try{
            const timesJson = req.body;
            const values = await jsonToList(timesJson)
            const sql = `INSERT INTO timesheet.times (email, year, month, day, hours) VALUES ${values}`;

            res.statusCode = 201;
            res.send({
                success: true,
                status: 201,
                message: "pass"
            });
        }catch(err){
            resError(res, err);
        }
    }

    async getTimesByMonth(req: Request, res: Response){
        const email = req.session.email;
        const year = req.query.year;
        const month = req.query.month;

        try{
            const times = await dbConnect.pool.query($sql.queries.getTimeByMonth, [email, year, month])
            res.statusCode = 200;
            res.send({
                success: true,
                status: 200,
                data: times.rows
            });
        }catch(err){
            resError(res, err);
        }
    }
}