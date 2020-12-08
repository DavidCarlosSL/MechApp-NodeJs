"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
var Validator = /** @class */ (function () {
    function Validator() {
    }
    Validator.validadeRequiredFields = function (reqFileds, data) {
        var fields = Object.keys(data).filter(function (e) { return reqFileds.includes(e); });
        return fields.length !== reqFileds.length ? true : false;
    };
    return Validator;
}());
exports.Validator = Validator;
