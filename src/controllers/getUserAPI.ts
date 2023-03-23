import {Request, Response, NextFunction} from 'express'
import { Session } from 'express-session';
import  dbConnect  from '../middleware/dbConnect'
const $sql = require ('./queries')

const dotenv = require('dotenv')
dotenv.config({ path: './.env'})

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const domain = process.env.DOMAIN || "localhost"
const port = process.env.PORT || 4000;

interface registerData {
    email: string;
    password: string;
}

// display error on error, use msg to pinpoint which function failed
const resError = (res: any, err: any, statusCode=501) => {
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

// check password format
function checkPasswordFormat(password){
    const validPasswordRegex = /^[a-zA-Z0-9]+$/
    return new Promise((resolve, reject)=>{
        if (validPasswordRegex.test(password)){
            resolve(true)
        } else {
            reject('Invalid password format, only numbers and letters allowed, no spaces or special characters')
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
        const registerJson = req.body as { email: string, password: string };
        const email = registerJson.email
        const password = bcrypt.hashSync(registerJson.password, 8)

        // check field
        try{
            // check email format
            const checkEmailFomat = await checkEmailFormat(email)

            // check if user already exists
            const exists = await dbConnect.pool.query($sql.queries.userExists, [email])
            if(exists.rows[0].count > 0){
                throw "Email already exists."
            }        

            // add into db
            await dbConnect.pool.query($sql.queries.addUser, [email, password]);

            // set session variable
            req.session.email = email;

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
        const loginJson = req.body as { email: string, password: string };
        const email = loginJson.email
        const password = loginJson.password

        try{
            
            // check if user already exists
            const exists = await dbConnect.pool.query($sql.queries.userExists, [email])
            if(exists.rows[0].count == 0){
                throw "Email does not exists."
            }

            // get account info and compare hashed pass
            const getUser = await dbConnect.pool.query($sql.queries.getUser, [email])
            await checkPassword(password, getUser.rows[0].password)

            // token expire, 24hrs
            const tokenExpire = 24 * 60 * 60

            // generate access token
            const token = await jwt.sign({ id: email }, process.env.ACCOUNT_HASH, {
                expiresIn: tokenExpire
              });

            // set session variable and go to home
            req.session.email = email;

            // return success msg
            res.cookie('access_token', token,{
                maxAge: tokenExpire * 1000
            })
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
                console.log(err)
                resError(res, err);
            }
            
        }
    }

    // logout
    async logout(req, res) {
        res.clearCookie('access_token');
        res.clearCookie('connect.sid');
        res.redirect(`https://${domain}:${port}/login`);
      }
}