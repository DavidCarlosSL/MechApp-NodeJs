"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scheduling = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var client_model_1 = require("./client.model");
var mechanical_model_1 = require("./mechanical.model");
var Scheduling = /** @class */ (function () {
    function Scheduling() {
    }
    tslib_1.__decorate([
        typeorm_1.PrimaryColumn('int', {
            primary: true,
            generated: true,
            nullable: false,
            name: "id_scheduling"
        })
    ], Scheduling.prototype, "id_scheduling", void 0);
    tslib_1.__decorate([
        typeorm_1.Column('varchar', {
            nullable: true,
            name: "description_scheduling",
            length: "250"
        })
    ], Scheduling.prototype, "descriptionScheduling", void 0);
    tslib_1.__decorate([
        typeorm_1.Column('varchar', {
            nullable: false,
            default: "Active",
            name: "status_scheduling",
            length: "10"
        })
    ], Scheduling.prototype, "statusScheduling", void 0);
    tslib_1.__decorate([
        typeorm_1.Column("datetime", {
            nullable: false,
            name: "date_scheduling"
        })
    ], Scheduling.prototype, "dateScheduling", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function (type) { return client_model_1.Client; }),
        typeorm_1.JoinColumn({ name: "clientId", referencedColumnName: "id_client" })
    ], Scheduling.prototype, "clientId", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function (type) { return mechanical_model_1.Mechanical; }),
        typeorm_1.JoinColumn({ name: "mechanicalId", referencedColumnName: "id_mechanical" })
    ], Scheduling.prototype, "mechanicalId", void 0);
    Scheduling = tslib_1.__decorate([
        typeorm_1.Entity({ name: "scheduling" })
    ], Scheduling);
    return Scheduling;
}());
exports.Scheduling = Scheduling;
