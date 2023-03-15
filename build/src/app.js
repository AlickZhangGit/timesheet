"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dataRoutes_1 = require("./routes/dataRoutes");
const userRoutes_1 = require("./routes/userRoutes");
const path = require("path");
class App {
    constructor() {
        this.routeData = new dataRoutes_1.Data();
        this.routeUser = new userRoutes_1.User();
        this.app = express();
        this.routeData.routes(this.app);
        this.routeUser.routes(this.app);
    }
}
exports.default = new App().app;
