"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var moment_1 = tslib_1.__importDefault(require("moment"));
var chat_model_1 = require("./chat.model");
var Message = /** @class */ (function () {
    function Message() {
    }
    tslib_1.__decorate([
        typeorm_1.PrimaryColumn('int', {
            primary: true,
            generated: true,
            nullable: false,
            name: "id_message"
        })
    ], Message.prototype, "id_message", void 0);
    tslib_1.__decorate([
        typeorm_1.Column('varchar', {
            nullable: false,
            length: "11",
            name: "typeSender"
        })
    ], Message.prototype, "typeSender", void 0);
    tslib_1.__decorate([
        typeorm_1.Column('varchar', {
            nullable: false,
            length: "500",
            name: "content"
        })
    ], Message.prototype, "content", void 0);
    tslib_1.__decorate([
        typeorm_1.Column("datetime", {
            nullable: false,
            name: "createdAt",
            default: moment_1.default.utc().format("YYYY-MM-DD HH:mm:ss")
        })
    ], Message.prototype, "createdAt", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function (type) { return chat_model_1.Chat; }),
        typeorm_1.JoinColumn({ name: "chatId", referencedColumnName: "id_chat" })
    ], Message.prototype, "chatId", void 0);
    Message = tslib_1.__decorate([
        typeorm_1.Entity({ name: "message" })
    ], Message);
    return Message;
}());
exports.Message = Message;
