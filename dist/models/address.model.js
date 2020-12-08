"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var state_model_1 = require("./state.model");
var mechanical_model_1 = require("./mechanical.model");
var Address = /** @class */ (function () {
    function Address() {
    }
    tslib_1.__decorate([
        typeorm_1.PrimaryColumn('int', {
            primary: true,
            generated: true,
            nullable: false,
            name: "id_address"
        })
    ], Address.prototype, "id_address", void 0);
    tslib_1.__decorate([
        typeorm_1.Column('varchar', {
            nullable: false,
            name: "zip_address",
            length: "8"
        })
    ], Address.prototype, "zipAddress", void 0);
    tslib_1.__decorate([
        typeorm_1.Column('varchar', {
            nullable: false,
            name: "city_address",
            length: "120"
        })
    ], Address.prototype, "cityAddress", void 0);
    tslib_1.__decorate([
        typeorm_1.Column('varchar', {
            nullable: false,
            name: "neighborhood_address",
            length: "150"
        })
    ], Address.prototype, "neighborhoodAddress", void 0);
    tslib_1.__decorate([
        typeorm_1.Column('varchar', {
            nullable: false,
            name: "street_address",
            length: "150"
        })
    ], Address.prototype, "streetAddress", void 0);
    tslib_1.__decorate([
        typeorm_1.Column('int', {
            nullable: false,
            name: "number_address"
        })
    ], Address.prototype, "numberAddress", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function (type) { return state_model_1.State; }),
        typeorm_1.JoinColumn({ name: "stateId", referencedColumnName: 'id_state' })
    ], Address.prototype, "stateId", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function (type) { return mechanical_model_1.Mechanical; }),
        typeorm_1.JoinColumn({ name: "mechanicalId", referencedColumnName: "id_mechanical" })
    ], Address.prototype, "mechanicalId", void 0);
    Address = tslib_1.__decorate([
        typeorm_1.Entity({ name: 'address' })
    ], Address);
    return Address;
}());
exports.Address = Address;
