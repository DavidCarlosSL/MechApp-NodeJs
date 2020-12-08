"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Code = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var mechanical_model_1 = require("./mechanical.model");
var Code = /** @class */ (function () {
    function Code() {
    }
    tslib_1.__decorate([
        typeorm_1.PrimaryColumn('int', {
            generated: true,
            primary: true,
            nullable: false,
            name: "id_code"
        })
    ], Code.prototype, "id_code", void 0);
    tslib_1.__decorate([
        typeorm_1.Column('int', {
            nullable: false,
            name: "value_code"
        })
    ], Code.prototype, "valueCode", void 0);
    tslib_1.__decorate([
        typeorm_1.Column('varchar', {
            nullable: false,
            default: 'valid',
            name: "status_code"
        })
    ], Code.prototype, "statusCode", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function (type) { return mechanical_model_1.Mechanical; }),
        typeorm_1.JoinColumn({ name: 'mechanicalId', referencedColumnName: 'id_mechanical' })
    ], Code.prototype, "mechanicalId", void 0);
    Code = tslib_1.__decorate([
        typeorm_1.Entity({ name: "code" })
    ], Code);
    return Code;
}());
exports.Code = Code;
