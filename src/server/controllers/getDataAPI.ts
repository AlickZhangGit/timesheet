import { Request, Response, NextFunction } from "express";
import dbConnect from "../middleware/dbConnect";
import jwt_decode from "jwt-decode";
const $sql = require("./queries");

const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

// display error on error, use msg to pinpoint which function failed
const resError = (res: any, err: any, statusCode = 501) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = statusCode;
  res.send({
    Error: err,
    code: err.code,
  });
};

interface timesData {
  email: string;
  year: string;
  month: string;
  day: string;
  hours: string;
}

function jsonToList(jsonData) {
  return new Promise((resolve, reject) => {
    try {
      const rows: timesData[] = jsonData;
      const values = rows
        .filter(row => row.email && row.year && row.month && row.day && row.hours)
        .map(
          (row) =>
            `('${row.email}', '${row.year}', '${row.month}', '${row.day}', '${row.hours}')`
        )
        .join(", ");
      resolve(values);
    } catch (err) {
      reject("Error parsing data to list");
    }
  });
}

function getDecodedAccessToken(token: string): any {
    return new Promise((resolve, reject) => {
        try {
            resolve(jwt_decode(token));
        } catch (err) {
            reject(err);
        }
      });
  }

export class DataAPI {
  async getTest(req: Request, res: Response) {
    try {
      res.statusCode = 200;
      res.send({
        success: true,
        status: 200,
        message: "true",
      });
    } catch (err) {
      resError(res, err);
    }
  }

  async postTimesData(req: Request, res: Response) {
    const token = req.cookies?.access_token;
    try {
        const decoded = await getDecodedAccessToken(token)
        const email = decoded.id
        const body = req.body
        const timesJson = body.map((el)=>{
          return {email: email, ...el}
        });
      
        const values = await jsonToList(timesJson);
        const sql = `INSERT INTO timesheet.times (email, year, month, day, hours) VALUES ${values} ON CONFLICT (email, year, month, day) DO UPDATE SET hours = excluded.hours;`;
        await dbConnect.pool.query(sql)
        res.statusCode = 201;
        res.send({
          message: "success",
        });
    } catch (err) {
      console.log(err)
      resError(res, err);
    }
  }

  async getTimesByMonth(req: Request, res: Response) {
    const token = req.cookies?.access_token;
    const decoded = await getDecodedAccessToken(token) 
    try {
        const email = decoded.id
        const year = req.query.year;
        const month = req.query.month;
        console.log(`I received a request from ${email} to get data for the year ${year} and month ${month}`)
        const times = await dbConnect.pool.query($sql.queries.getTimeByMonth, [
        email,
        year,
        month,
      ]);
      res.statusCode = 200;
      res.send({
        data: times.rows,
      });
    } catch (err) {
      resError(res, err);
    }
  }
}
