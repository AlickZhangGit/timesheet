import {Request, Response, NextFunction} from 'express'
import  path = require ('path');

// display error on error, use msg to pinpoint which function failed
const resError = (res: any, err: any, statusCode=501) => {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = statusCode;
    res.send({
        status: err,
        code: err.code
    });
}

export class FrontRoute {
    getHome(req: Request, res: Response){
        res.sendFile(path.join(__dirname, "../../../dist/index.html"))
    }

    assetsIndex(req: Request, res: Response){
        res.sendFile(path.join(__dirname, "../../../dist", req.path))
    }
}