"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mechanical = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var category_model_1 = require("./category.model");
var rating_model_1 = require("./rating.model");
var address_model_1 = require("./address.model");
var chat_model_1 = require("./chat.model");
var code_model_1 = require("./code.model");
var complaint_model_1 = require("./complaint.model");
var scheduling_model_1 = require("./scheduling.model");
var Mechanical = /** @class */ (function () {
    function Mechanical() {
    }
    tslib_1.__decorate([
        typeorm_1.PrimaryColumn('int', {
            generated: true,
            nullable: false,
            primary: true,
            name: 'id_mechanical'
        })
    ], Mechanical.prototype, "id_mechanical", void 0);
    tslib_1.__decorate([
        typeorm_1.Column('varchar', {
            length: "150",
            name: 'company_name',
            nullable: false,
            unique: true
        })
    ], Mechanical.prototype, "companyName", void 0);
    tslib_1.__decorate([
        typeorm_1.Column("varchar", {
            length: "14",
            name: "cnpj_mechanical",
            nullable: false,
            unique: true
        })
    ], Mechanical.prototype, "cnpjMechanical", void 0);
    tslib_1.__decorate([
        typeorm_1.Column('varchar', {
            length: "150",
            nullable: false,
            name: "name_mechanical"
        })
    ], Mechanical.prototype, "nameMechanical", void 0);
    tslib_1.__decorate([
        typeorm_1.Column("varchar", {
            length: "120",
            nullable: false,
            unique: true,
            name: "email_mechanical"
        })
    ], Mechanical.prototype, "emailMechanical", void 0);
    tslib_1.__decorate([
        typeorm_1.Column("varchar", {
            length: "120",
            nullable: false,
            name: "password_mechanical"
        })
    ], Mechanical.prototype, "passwordMechanical", void 0);
    tslib_1.__decorate([
        typeorm_1.Column("varchar", {
            length: "150",
            nullable: true,
            name: "image_mechanical"
        })
    ], Mechanical.prototype, "imageMechanical", void 0);
    tslib_1.__decorate([
        typeorm_1.Column("varchar", {
            length: "7",
            nullable: true,
            name: "average_price"
        })
    ], Mechanical.prototype, "averagePrice", void 0);
    tslib_1.__decorate([
        typeorm_1.Column('varchar', {
            nullable: true,
            name: "description_mechanical",
            length: "200"
        })
    ], Mechanical.prototype, "descriptionMechanical", void 0);
    tslib_1.__decorate([
        typeorm_1.Column("varchar", {
            length: "11",
            nullable: false,
            name: "type_person",
            default: "mechanical"
        })
    ], Mechanical.prototype, "typePerson", void 0);
    tslib_1.__decorate([
        typeorm_1.Column("varchar", {
            length: "5",
            nullable: false,
            default: "false",
            name: "verified"
        })
    ], Mechanical.prototype, "verified", void 0);
    tslib_1.__decorate([
        typeorm_1.Column("datetime", {
            nullable: false,
            name: "createdAt"
        })
    ], Mechanical.prototype, "createdAt", void 0);
    tslib_1.__decorate([
        typeorm_1.Column("datetime", {
            nullable: false,
            name: "updatedAt"
        })
    ], Mechanical.prototype, "updatedAt", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function (type) { return chat_model_1.Chat; }, function (chat) { return chat.mechanicalId; })
    ], Mechanical.prototype, "chats", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function (type) { return address_model_1.Address; }, function (address) { return address.mechanicalId; })
    ], Mechanical.prototype, "addresses", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function (type) { return rating_model_1.Rating; }, function (rating) { return rating.mechanicalId; })
    ], Mechanical.prototype, "ratings", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function (type) { return code_model_1.Code; }, function (code) { return code.mechanicalId; })
    ], Mechanical.prototype, "codes", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function (type) { return complaint_model_1.Complaint; }, function (complaint) { return complaint.mechanicalId; })
    ], Mechanical.prototype, "complaints", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function (type) { return scheduling_model_1.Scheduling; }, function (scheduling) { return scheduling.mechanicalId; })
    ], Mechanical.prototype, "schedulings", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToMany(function (type) { return category_model_1.Category; }),
        typeorm_1.JoinTable({
            name: "mechanical_categories",
            joinColumn: { name: "mechanicalId", referencedColumnName: "id_mechanical" },
            inverseJoinColumn: { name: "categoryId", referencedColumnName: "id_category" }
        })
    ], Mechanical.prototype, "categories", void 0);
    Mechanical = tslib_1.__decorate([
        typeorm_1.Entity({ name: "mechanical" })
    ], Mechanical);
    return Mechanical;
}());
exports.Mechanical = Mechanical;
