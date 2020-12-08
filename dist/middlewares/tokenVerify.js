"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenVerify = void 0;
var tslib_1 = require("tslib");
var jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
var custom_environment_variables_json_1 = require("../config/custom-environment-variables.json");
function tokenVerify(req, res, next) {
    var token = req.header('x-access-token');
    if (!token)
        return res.status(401).send({
            tokenProvided: false,
            validToken: false,
            message: "Access denied. No Token provided"
        });
    try {
        var tokenDecoded = jsonwebtoken_1.default.verify(token, custom_environment_variables_json_1.jwtPrivateKey);
        req.person = tokenDecoded;
        next();
    }
    catch (err) {
        res.status(400).send({
            tokenProvided: true,
            validToken: false,
            message: "Invalid Token"
        });
    }
}
exports.tokenVerify = tokenVerify;
