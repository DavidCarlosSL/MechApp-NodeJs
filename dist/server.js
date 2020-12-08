"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var body_parser_1 = tslib_1.__importDefault(require("body-parser"));
var cors_1 = tslib_1.__importDefault(require("cors"));
var inversify_express_utils_1 = require("inversify-express-utils");
var db_1 = require("./database/db");
require("./controllers/index.controller");
var container_1 = tslib_1.__importDefault(require("./services/container"));
var server = new inversify_express_utils_1.InversifyExpressServer(container_1.default.Load());
var port = 3000;
server.setConfig(function (app) {
    app.use(body_parser_1.default.urlencoded({
        extended: true
    }));
    app.use(body_parser_1.default.json());
    app.use(cors_1.default());
});
db_1.dbConnFactory().then(function () {
    console.log("Success Database Connection");
    var app = server.build();
    app.listen(port, function () {
        console.log("Listening on port " + port);
    });
}).catch(function (err) {
    console.log({ message: 'Problems to connect the Database', error: err });
});
