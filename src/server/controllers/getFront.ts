import { Request, Response, NextFunction } from "express";
import path = require("path");
const dotenv = require("dotenv");

// display error on error, use msg to pinpoint which function failed
const resError = (res: any, err: any, statusCode = 501) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = statusCode;
  res.send({
    status: err,
    code: err.code,
  });
};

export class FrontRoute {
  getHome(req: Request, res: Response) {
    if (process.env.ENV === "development") {
      res.sendFile(path.join(__dirname, "../../../dist/index.html"));
    } else if (process.env.ENV === "production") {
      res.sendFile(path.join(__dirname, "../../dist/index.html"));
    }
  }

  assetsIndex(req: Request, res: Response) {
    if (process.env.ENV === "development") {
      res.sendFile(path.join(__dirname, "../../../dist", req.path));
    } else if (process.env.ENV === "production") {
      res.sendFile(path.join(__dirname, "../../dist", req.path));
    }
  }
}
