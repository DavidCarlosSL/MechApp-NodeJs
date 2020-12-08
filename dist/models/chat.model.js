"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var moment_1 = tslib_1.__importDefault(require("moment"));
var client_model_1 = require("./client.model");
var mechanical_model_1 = require("./mechanical.model");
var message_model_1 = require("./message.model");
var Chat = /** @class */ (function () {
    function Chat() {
    }
    tslib_1.__decorate([
        typeorm_1.PrimaryColumn('int', {
            primary: true,
            generated: true,
            nullable: false,
            name: "id_chat"
        })
    ], Chat.prototype, "id_chat", void 0);
    tslib_1.__decorate([
        typeorm_1.Column('varchar', {
            nullable: false,
            name: 'status_chat',
            length: "20",
            default: "On going"
        })
    ], Chat.prototype, "statusChat", void 0);
    tslib_1.__decorate([
        typeorm_1.Column("datetime", {
            nullable: false,
            name: "createdAt",
            default: moment_1.default.utc().format("YYYY-MM-DD HH:mm:ss")
        })
    ], Chat.prototype, "createdAt", void 0);
    tslib_1.__decorate([
        typeorm_1.Column("datetime", {
            nullable: false,
            name: "updatedAt",
            default: moment_1.default.utc().format("YYYY-MM-DD HH:mm:ss")
        })
    ], Chat.prototype, "updatedAt", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function (type) { return client_model_1.Client; }),
        typeorm_1.JoinColumn({ name: "clientId", referencedColumnName: "id_client" })
    ], Chat.prototype, "clientId", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function (type) { return mechanical_model_1.Mechanical; }),
        typeorm_1.JoinColumn({ name: "mechanicalId", referencedColumnName: "id_mechanical" })
    ], Chat.prototype, "mechanicalId", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function (type) { return message_model_1.Message; }, function (message) { return message.id_message; })
    ], Chat.prototype, "messages", void 0);
    Chat = tslib_1.__decorate([
        typeorm_1.Entity({ name: "chat" })
    ], Chat);
    return Chat;
}());
exports.Chat = Chat;
