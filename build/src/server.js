"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const https = require("https");
const fs = require("fs");
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const port = process.env.PORT || 4000;
https
    .createServer({
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
}, app_1.default)
    .listen(port, () => {
    console.log(`Server is running here 👉 https://localhost:${port}`);
});
