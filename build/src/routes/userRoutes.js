"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const getUserAPI_1 = require("../controllers/getUserAPI");
// front end routes
class User {
    constructor() {
        this.apiPath = '/api/v1';
        this.dataApi = new getUserAPI_1.UserAPI();
    }
    routes(app) {
        app.route(this.apiPath + "/postLogin")
            .post(this.dataApi.signup);
    }
}
exports.User = User;
