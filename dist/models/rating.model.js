"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rating = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var moment_1 = tslib_1.__importDefault(require("moment"));
var client_model_1 = require("./client.model");
var mechanical_model_1 = require("./mechanical.model");
var Rating = /** @class */ (function () {
    function Rating() {
    }
    tslib_1.__decorate([
        typeorm_1.PrimaryColumn('int', {
            primary: true,
            generated: true,
            nullable: false,
            name: 'id_rating'
        })
    ], Rating.prototype, "id_rating", void 0);
    tslib_1.__decorate([
        typeorm_1.Column('int', {
            nullable: false,
            default: 0,
            name: 'score_rating'
        })
    ], Rating.prototype, "scoreRating", void 0);
    tslib_1.__decorate([
        typeorm_1.Column('varchar', {
            nullable: true,
            name: "description_rating",
            length: "250"
        })
    ], Rating.prototype, "descriptionRating", void 0);
    tslib_1.__decorate([
        typeorm_1.Column("datetime", {
            nullable: false,
            name: "createdAt",
            default: moment_1.default.utc().format("YYYY-MM-DD HH:mm:ss")
        })
    ], Rating.prototype, "createdAt", void 0);
    tslib_1.__decorate([
        typeorm_1.Column("datetime", {
            nullable: false,
            name: "updatedAt",
            default: moment_1.default.utc().format("YYYY-MM-DD HH:mm:ss")
        })
    ], Rating.prototype, "updatedAt", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function (type) { return client_model_1.Client; }),
        typeorm_1.JoinColumn({ name: "clientId", referencedColumnName: "id_client" })
    ], Rating.prototype, "clientId", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function (type) { return mechanical_model_1.Mechanical; }),
        typeorm_1.JoinColumn({ name: "mechanicalId", referencedColumnName: "id_mechanical" })
    ], Rating.prototype, "mechanicalId", void 0);
    Rating = tslib_1.__decorate([
        typeorm_1.Entity({ name: "rating" })
    ], Rating);
    return Rating;
}());
exports.Rating = Rating;
