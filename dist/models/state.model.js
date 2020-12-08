"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var address_model_1 = require("./address.model");
var State = /** @class */ (function () {
    function State() {
    }
    tslib_1.__decorate([
        typeorm_1.PrimaryColumn('int', {
            primary: true,
            generated: true,
            nullable: false,
            name: "id_state"
        })
    ], State.prototype, "id_state", void 0);
    tslib_1.__decorate([
        typeorm_1.Column('varchar', {
            nullable: false,
            unique: true,
            name: 'initials_state',
            length: "4"
        })
    ], State.prototype, "initialsState", void 0);
    tslib_1.__decorate([
        typeorm_1.Column('varchar', {
            nullable: false,
            unique: true,
            name: 'description_state',
            length: "50"
        })
    ], State.prototype, "descriptionState", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function (type) { return address_model_1.Address; }, function (address) { return address.stateId; })
    ], State.prototype, "addresses", void 0);
    State = tslib_1.__decorate([
        typeorm_1.Entity({ name: 'state' })
    ], State);
    return State;
}());
exports.State = State;
