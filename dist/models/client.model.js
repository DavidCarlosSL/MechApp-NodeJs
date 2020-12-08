"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var chat_model_1 = require("./chat.model");
var complaint_model_1 = require("./complaint.model");
var rating_model_1 = require("./rating.model");
var scheduling_model_1 = require("./scheduling.model");
var Client = /** @class */ (function () {
    function Client() {
    }
    tslib_1.__decorate([
        typeorm_1.PrimaryColumn('int', {
            generated: true,
            nullable: false,
            primary: true,
            name: 'id_client'
        })
    ], Client.prototype, "id_client", void 0);
    tslib_1.__decorate([
        typeorm_1.Column("varchar", {
            length: "150",
            nullable: false,
            name: "name_client"
        })
    ], Client.prototype, "nameClient", void 0);
    tslib_1.__decorate([
        typeorm_1.Column("varchar", {
            length: "120",
            nullable: false,
            unique: true,
            name: "email_client"
        })
    ], Client.prototype, "emailClient", void 0);
    tslib_1.__decorate([
        typeorm_1.Column("varchar", {
            length: "32",
            nullable: false,
            name: "password_client"
        })
    ], Client.prototype, "passwordClient", void 0);
    tslib_1.__decorate([
        typeorm_1.Column("varchar", {
            length: "150",
            nullable: true,
            name: "image_client"
        })
    ], Client.prototype, "imageClient", void 0);
    tslib_1.__decorate([
        typeorm_1.Column("varchar", {
            length: "11",
            nullable: false,
            name: "type_person",
            default: "client"
        })
    ], Client.prototype, "typePerson", void 0);
    tslib_1.__decorate([
        typeorm_1.Column("datetime", {
            nullable: false,
            name: "createdAt"
        })
    ], Client.prototype, "createdAt", void 0);
    tslib_1.__decorate([
        typeorm_1.Column("datetime", {
            nullable: false,
            name: "updatedAt"
        })
    ], Client.prototype, "updatedAt", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function (type) { return chat_model_1.Chat; }, function (chat) { return chat.clientId; })
    ], Client.prototype, "chats", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function (type) { return complaint_model_1.Complaint; }, function (complaint) { return complaint.clientId; })
    ], Client.prototype, "complaints", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function (type) { return rating_model_1.Rating; }, function (rating) { return rating.clientId; })
    ], Client.prototype, "ratings", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function (type) { return scheduling_model_1.Scheduling; }, function (scheduling) { return scheduling.clientId; })
    ], Client.prototype, "schedulings", void 0);
    Client = tslib_1.__decorate([
        typeorm_1.Entity({ name: 'client' })
    ], Client);
    return Client;
}());
exports.Client = Client;
