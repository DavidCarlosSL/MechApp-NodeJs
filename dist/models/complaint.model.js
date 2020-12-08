"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Complaint = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var moment_1 = tslib_1.__importDefault(require("moment"));
var client_model_1 = require("./client.model");
var mechanical_model_1 = require("./mechanical.model");
var Complaint = /** @class */ (function () {
    function Complaint() {
    }
    tslib_1.__decorate([
        typeorm_1.PrimaryColumn('int', {
            primary: true,
            generated: true,
            nullable: false,
            name: 'id_complaint'
        })
    ], Complaint.prototype, "id_complaint", void 0);
    tslib_1.__decorate([
        typeorm_1.Column('varchar', {
            nullable: true,
            name: "description_complaint",
            length: "500"
        })
    ], Complaint.prototype, "descriptionComplaint", void 0);
    tslib_1.__decorate([
        typeorm_1.Column("datetime", {
            nullable: false,
            name: "createdAt",
            default: moment_1.default.utc().format("YYYY-MM-DD HH:mm:ss")
        })
    ], Complaint.prototype, "createdAt", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function (type) { return client_model_1.Client; }),
        typeorm_1.JoinColumn({ name: "clientId", referencedColumnName: "id_client" })
    ], Complaint.prototype, "clientId", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function (type) { return mechanical_model_1.Mechanical; }),
        typeorm_1.JoinColumn({ name: "mechanicalId", referencedColumnName: "id_mechanical" })
    ], Complaint.prototype, "mechanicalId", void 0);
    Complaint = tslib_1.__decorate([
        typeorm_1.Entity({ name: 'complaint' })
    ], Complaint);
    return Complaint;
}());
exports.Complaint = Complaint;
