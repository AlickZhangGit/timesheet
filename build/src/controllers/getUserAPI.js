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
exports.UserAPI = void 0;
const $sql = require('./queries');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
// display error on error, use msg to pinpoint which function failed
let resError = (res, err, msg) => {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 501;
    res.send({
        status: 'Error: '.concat(msg),
        code: err.code
    });
};
// check email format
function checkEmailFormat(email) {
    const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return new Promise((resolve, reject) => {
        if (email.value.match(validEmailRegex)) {
            resolve(true);
        }
        else {
            reject('Invalid email format');
        }
    });
}
// check email exists
function checkEmailExists(email) {
    return new Promise((resolve, reject) => {
        resolve(true);
    });
}
class UserAPI {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let email = req.query.email;
            let password = bcrypt.hashSync(req.body.password, 8);
            // check field
            try {
                const checkEmail = yield checkEmailFormat(email);
            }
            catch (err) {
                resError(res, err, 'checkEmail');
            }
        });
    }
}
exports.UserAPI = UserAPI;
