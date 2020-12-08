"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
var tslib_1 = require("tslib");
var inversify_1 = require("inversify");
var inversify_express_utils_1 = require("inversify-express-utils");
var moment_timezone_1 = tslib_1.__importDefault(require("moment-timezone"));
var validator_1 = require("../utils/validator");
var tokenVerify_1 = require("../middlewares/tokenVerify");
var ChatController = /** @class */ (function () {
    function ChatController(chatService) {
        this.chatService = chatService;
    }
    ChatController.prototype.newChat = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var requiredData, chatResponse, now, chat, newChat, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        requiredData = ["mechanicalId"];
                        if (validator_1.Validator.validadeRequiredFields(requiredData, req.body))
                            return [2 /*return*/, res.status(400).send({ message: "Required fields wasn't provided" })];
                        return [4 /*yield*/, this.chatService.getChatByClientAndMechanical(req.person.clientId, req.body.mechanicalId)];
                    case 1:
                        chatResponse = _a.sent();
                        if (chatResponse)
                            return [2 /*return*/, res.status(200).send({ createdChat: false, existingChat: true, chatId: chatResponse.id_chat })];
                        now = moment_timezone_1.default(new Date()).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
                        chat = {
                            clientId: req.person.clientId,
                            mechanicalId: req.body.mechanicalId,
                            createdAt: now,
                            updatedAt: now
                        };
                        return [4 /*yield*/, this.chatService.newChat(chat)];
                    case 2:
                        newChat = _a.sent();
                        res.status(201).send({ createdChat: true, chatId: newChat.raw.insertId });
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        res.status(500).send({ message: "Something went wrong", error: err_1 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ChatController.prototype.getClientChats = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var chats, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!req.person.clientId)
                            return [2 /*return*/, res.status(400).send({ validToken: false })];
                        return [4 /*yield*/, this.chatService.getChatsByClient(req.person.clientId)];
                    case 1:
                        chats = _a.sent();
                        if (!chats.length)
                            return [2 /*return*/, res.status(200).send({ haveChats: false })];
                        res.status(200).send({ haveChats: true, chats: chats });
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        res.status(500).send({ message: "Something went wrong", error: err_2 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ChatController.prototype.getMechanicalChats = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var chats, err_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!req.person.mechanicalId)
                            return [2 /*return*/, res.status(400).send({ validToken: false })];
                        return [4 /*yield*/, this.chatService.getChatsByMechanical(req.person.mechanicalId)];
                    case 1:
                        chats = _a.sent();
                        if (!chats.length)
                            return [2 /*return*/, res.status(200).send({ haveChats: false })];
                        res.status(200).send({ haveChats: true, chats: chats });
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        res.status(500).send({ message: "Something went wrong", error: err_3 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ChatController.prototype.getMessages = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var requiredData, messagesResponse, err_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        requiredData = ["chatId", "limit"];
                        if (validator_1.Validator.validadeRequiredFields(requiredData, req.body))
                            return [2 /*return*/, res.status(400).send({ message: "Required fields wasn't provided" })];
                        return [4 /*yield*/, this.chatService.getMessagesByChat(req.body.chatId, req.body.limit)];
                    case 1:
                        messagesResponse = _a.sent();
                        if (!messagesResponse.length)
                            return [2 /*return*/, res.status(200).send({ haveMessages: false })];
                        res.status(200).send({ haveMessages: true, messages: messagesResponse });
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        res.status(500).send({ message: "Something went wrong", error: err_4 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ChatController.prototype.sendMessage = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var requiredData, now, message, err_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        requiredData = ["typeSender", "content", "chatId"];
                        if (validator_1.Validator.validadeRequiredFields(requiredData, req.body))
                            return [2 /*return*/, res.status(400).send({ message: "Required fields wasn't provided" })];
                        now = moment_timezone_1.default(new Date()).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
                        message = {
                            typeSender: req.body.typeSender,
                            content: req.body.content,
                            createdAt: now,
                            chatId: req.body.chatId
                        };
                        return [4 /*yield*/, this.chatService.sendMessage(message)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.chatService.updateChat(req.body.chatId, now)];
                    case 2:
                        _a.sent();
                        res.status(201).send({ createdMessage: true, updatedChat: true });
                        return [3 /*break*/, 4];
                    case 3:
                        err_5 = _a.sent();
                        res.status(500).send({ message: "Something went wrong", error: err_5 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        inversify_express_utils_1.httpPost("/add", tokenVerify_1.tokenVerify),
        tslib_1.__param(0, inversify_express_utils_1.request()), tslib_1.__param(1, inversify_express_utils_1.response())
    ], ChatController.prototype, "newChat", null);
    tslib_1.__decorate([
        inversify_express_utils_1.httpGet("/client", tokenVerify_1.tokenVerify),
        tslib_1.__param(0, inversify_express_utils_1.request()), tslib_1.__param(1, inversify_express_utils_1.response())
    ], ChatController.prototype, "getClientChats", null);
    tslib_1.__decorate([
        inversify_express_utils_1.httpGet("/mechanical", tokenVerify_1.tokenVerify),
        tslib_1.__param(0, inversify_express_utils_1.request()), tslib_1.__param(1, inversify_express_utils_1.response())
    ], ChatController.prototype, "getMechanicalChats", null);
    tslib_1.__decorate([
        inversify_express_utils_1.httpPost("/messages", tokenVerify_1.tokenVerify),
        tslib_1.__param(0, inversify_express_utils_1.request()), tslib_1.__param(1, inversify_express_utils_1.response())
    ], ChatController.prototype, "getMessages", null);
    tslib_1.__decorate([
        inversify_express_utils_1.httpPost("/sendmessage", tokenVerify_1.tokenVerify),
        tslib_1.__param(0, inversify_express_utils_1.request()), tslib_1.__param(1, inversify_express_utils_1.response())
    ], ChatController.prototype, "sendMessage", null);
    ChatController = tslib_1.__decorate([
        inversify_express_utils_1.controller("/chat"),
        tslib_1.__param(0, inversify_1.inject("ChatService"))
    ], ChatController);
    return ChatController;
}());
exports.ChatController = ChatController;
