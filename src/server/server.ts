import app from "./app";
const https = require("https");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const domain = process.env.DOMAIN || "localhost";
const port = process.env.PORT || 4000;

declare module "express-session" {
  interface SessionData {
    email: string;
  }
}

https
  .createServer(
    {
      key: fs.readFileSync("certs/key.pem"),
      cert: fs.readFileSync("certs/cert.pem"),
    },
    app
  )
  .listen(port, domain, () => {
    console.log(`Server is running here 👉 https://${domain}:${port}`);
  });
