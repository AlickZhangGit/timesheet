"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = void 0;
const getDataAPI_1 = require("../controllers/getDataAPI");
// api routes
class Data {
    constructor() {
        this.apiPath = '/api/v1';
        this.dataApi = new getDataAPI_1.DataAPI();
    }
    routes(app) {
        app.route(this.apiPath + "/postLogin")
            .post(this.dataApi.postLogin);
    }
}
exports.Data = Data;
