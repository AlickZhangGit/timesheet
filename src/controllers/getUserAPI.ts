import {Request, Response, NextFunction} from 'express'
import  dbConnect  from '../controllers/dbConnect'
const $sql = require ('./queries')

const dotenv = require('dotenv')
dotenv.config({ path: './.env'})

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// display error on error, use msg to pinpoint which function failed
let resError = (res: any, err: any, statusCode=501) => {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = statusCode;
    res.send({
        status: err,
        code: err.code
    });
}

// check email format
function checkEmailFormat(email){
    const validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return new Promise((resolve, reject)=>{
        if (validEmailRegex.test(email)){
            resolve(true)
        } else {
            reject('Invalid email format')
        }
    })
}

// check password against hash
function checkPassword(password, hash){
    return new Promise((resolve, reject)=>{
        const passwordIsValid = bcrypt.compareSync(password, hash)
        if (passwordIsValid){
            resolve(true)
        } else {
            reject('Incorrect password')
        }
    })
}


export class UserAPI {

    // register call
    async register(req: Request, res: Response){
        let email = req.query.email;
        let password = bcrypt.hashSync(req.query.password, 8)

        // check field
        try{
            // check email format
            const checkEmailFomat = await checkEmailFormat(email)

            // check if user already exists
            const exists = await dbConnect.pool.query($sql.queries.userExists, [email])
            if(exists[0].count > 0){
                throw "Email already exists."
            }        

            // add into db
            await dbConnect.pool.query($sql.queries.addUser, [email, password]);

            // return success msg
            res.statusCode = 201;
            res.send({
                success: true,
                status: 201,
                message: "User registered successfully!"
            });

        } catch(err){
            resError(res, err);
        }

    }

    // login call
    async login(req: Request, res: Response){
        let email = req.query.email;
        let password = req.query.password

        try{
            // check if user already exists
            const exists = await dbConnect.pool.query($sql.queries.userExists, [email])
            if(exists[0].count == 0){
                throw "Email does not exists."
            }

            // get account info and compare hashed pass
            const getUser = await dbConnect.pool.query($sql.queries.getUser, [email])
            await checkPassword(password, getUser[0].password)

            // generate access token
            const token = await jwt.sign({ id: email }, process.env.ACCOUNT_HASH, {
                expiresIn: 86400 // 24 hours
              });

            // return success msg
            res.statusCode = 200;
            res.send({
                success: true,
                status: 200,
                message: "User login success!",
                accessToken: token
            });

        } catch(err){
            if (String(err).includes('Incorrect password')){
                resError(res, err, 403);
            }else{
                resError(res, err);
            }
            
        }  
    }
}