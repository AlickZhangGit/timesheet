"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataAPI = void 0;
const $sql = require('./queries');
const dotenv = require('dotenv');
const pool = require('./dbConnect');
dotenv.config({ path: './.env' });
// display error on error, use msg to pinpoint which function failed
let resError = (res, err, msg) => {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 500;
    res.send({
        status: 'Error: '.concat(msg),
        code: err.code
    });
};
class DataAPI {
    postLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.query.id;
            // do the query
            pool.query($sql.queries.test, [id], function (err, result) {
                // return if query error
                if (err) {
                    console.error(err);
                    resError(res, err, 'postLogin');
                    // return on success
                }
                else {
                    res.statusCode = 201;
                    res.send({
                        success: true,
                        status: 201,
                        message: result
                    });
                }
            });
        });
    }
}
exports.DataAPI = DataAPI;
