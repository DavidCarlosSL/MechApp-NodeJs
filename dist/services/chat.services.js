"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var inversify_1 = require("inversify");
var typeorm_1 = require("typeorm");
var chat_model_1 = require("../models/chat.model");
var message_model_1 = require("../models/message.model");
var ChatService = /** @class */ (function () {
    function ChatService() {
        this.connection = typeorm_1.getConnection('crudConn');
        this.chatRepository = this.connection.getRepository(chat_model_1.Chat);
        this.messageRepository = this.connection.getRepository(message_model_1.Message);
    }
    ChatService.prototype.newChat = function (chatData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var chat;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.chatRepository.createQueryBuilder().insert()
                            .values({
                            clientId: chatData.clientId,
                            mechanicalId: chatData.mechanicalId,
                            createdAt: chatData.createdAt,
                            updatedAt: chatData.updatedAt
                        })
                            .execute()];
                    case 1:
                        chat = _a.sent();
                        return [2 /*return*/, chat];
                }
            });
        });
    };
    ChatService.prototype.getChatByClientAndMechanical = function (clientId, mechanicalId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var chat;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.chatRepository.createQueryBuilder()
                            .select("id_chat")
                            .where("clientId = :clientId AND mechanicalId = :mechanicalId", { clientId: clientId, mechanicalId: mechanicalId })
                            .getRawOne()];
                    case 1:
                        chat = _a.sent();
                        return [2 /*return*/, chat];
                }
            });
        });
    };
    ChatService.prototype.getChatsByClient = function (clientId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var chat;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.chatRepository.createQueryBuilder("chat")
                            .innerJoinAndSelect("chat.mechanicalId", "mechanical")
                            .where("clientId = :clientId", { clientId: clientId })
                            .orderBy("chat.updatedAt", "DESC")
                            .select(["id_chat", "status_chat", "mechanical.id_mechanical", "mechanical.name_mechanical", "mechanical.image_mechanical", "mechanical.email_mechanical"])
                            .getRawMany()];
                    case 1:
                        chat = _a.sent();
                        return [2 /*return*/, chat];
                }
            });
        });
    };
    ChatService.prototype.getChatsByMechanical = function (mechanicalId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var chat;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.chatRepository.createQueryBuilder("chat")
                            .innerJoinAndSelect("chat.clientId", "client")
                            .where("mechanicalId = :mechanicalId", { mechanicalId: mechanicalId })
                            .orderBy("chat.updatedAt", "DESC")
                            .select(["id_chat", "status_chat", "client.id_client", "client.name_client", "client.image_client", "client.email_client"])
                            .getRawMany()];
                    case 1:
                        chat = _a.sent();
                        return [2 /*return*/, chat];
                }
            });
        });
    };
    ChatService.prototype.getMessagesByChat = function (chatId, limit) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var messages;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageRepository.createQueryBuilder()
                            .where("chatId = :chatId", { chatId: chatId })
                            .orderBy("createdAt", "DESC")
                            .take(limit)
                            .getMany()];
                    case 1:
                        messages = _a.sent();
                        return [2 /*return*/, messages];
                }
            });
        });
    };
    ChatService.prototype.sendMessage = function (messageData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var message;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageRepository.createQueryBuilder().insert()
                            .values({
                            typeSender: messageData.typeSender,
                            content: messageData.content,
                            createdAt: messageData.createdAt,
                            chatId: messageData.chatId
                        })
                            .execute()];
                    case 1:
                        message = _a.sent();
                        return [2 /*return*/, message];
                }
            });
        });
    };
    ChatService.prototype.updateChat = function (chatId, moment) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connection.createQueryBuilder()
                            .update(chat_model_1.Chat)
                            .set({ updatedAt: moment })
                            .where("id_chat = :chatId", { chatId: chatId })
                            .execute()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatService.prototype.changeStatusByChat = function (chatId, status) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connection.createQueryBuilder()
                            .update(chat_model_1.Chat)
                            .set({ statusChat: status })
                            .where("id_chat = :chatId", { chatId: chatId })
                            .execute()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatService = tslib_1.__decorate([
        inversify_1.injectable()
    ], ChatService);
    return ChatService;
}());
exports.default = ChatService;
