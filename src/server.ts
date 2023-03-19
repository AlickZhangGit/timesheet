import app from './app';
const https = require("https")
const fs = require("fs")
const dotenv = require('dotenv')
dotenv.config({ path: './.env'})


const port = process.env.PORT || 4000;

declare module 'express-session' {
    interface SessionData {
      email: string;
    }
  }

https
    .createServer(
    {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
    },
    app
    )
    .listen(port, ()=>{
        console.log(`Server is running here 👉 https://localhost:${port}`)
    })
