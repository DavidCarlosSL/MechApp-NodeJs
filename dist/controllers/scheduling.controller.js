"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulingController = void 0;
var tslib_1 = require("tslib");
var inversify_1 = require("inversify");
var inversify_express_utils_1 = require("inversify-express-utils");
var validator_1 = require("../utils/validator");
var tokenVerify_1 = require("../middlewares/tokenVerify");
var SchedulingController = /** @class */ (function () {
    function SchedulingController(schedulingService, chatService) {
        this.schedulingService = schedulingService;
        this.chatService = chatService;
    }
    SchedulingController.prototype.getSchedulingsByMechanical = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var schedulingResponse, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.schedulingService.getSchedulingsByMechanical(req.person.mechanicalId)];
                    case 1:
                        schedulingResponse = _a.sent();
                        if (!schedulingResponse.length)
                            return [2 /*return*/, res.status(200).send({ haveSchedulings: false })];
                        res.status(200).send({ haveSchedulings: true, schedulings: schedulingResponse });
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        res.status(500).send({ message: "Something went wrong", error: err_1 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SchedulingController.prototype.getSchedulingByClientAndMechanical = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var requiredData, schedulingResponse, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        requiredData = ["clientId"];
                        if (validator_1.Validator.validadeRequiredFields(requiredData, req.body))
                            return [2 /*return*/, res.status(400).send({ message: "Required fields wasn't provided" })];
                        return [4 /*yield*/, this.schedulingService.getSchedulingByClientAndMechanical(req.body.clientId, req.person.mechanicalId)];
                    case 1:
                        schedulingResponse = _a.sent();
                        if (!schedulingResponse)
                            return [2 /*return*/, res.status(200).send({ haveScheduling: false })];
                        return [2 /*return*/, res.status(200).send({ haveScheduling: true, scheduling: schedulingResponse })];
                    case 2:
                        err_2 = _a.sent();
                        res.status(500).send({ message: "Something went wrong", error: err_2 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SchedulingController.prototype.getSchedulingByMechanicalAndClient = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var requiredData, schedulingResponse, err_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        requiredData = ["mechanicalId"];
                        if (validator_1.Validator.validadeRequiredFields(requiredData, req.body))
                            return [2 /*return*/, res.status(400).send({ message: "Required fields wasn't provided" })];
                        return [4 /*yield*/, this.schedulingService.getSchedulingByClientAndMechanical(req.person.clientId, req.body.mechanicalId)];
                    case 1:
                        schedulingResponse = _a.sent();
                        if (!schedulingResponse)
                            return [2 /*return*/, res.status(200).send({ haveScheduling: false })];
                        return [2 /*return*/, res.status(200).send({ haveScheduling: true, scheduling: schedulingResponse })];
                    case 2:
                        err_3 = _a.sent();
                        res.status(500).send({ message: "Something went wrong", error: err_3 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SchedulingController.prototype.newScheduling = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var requiredData, scheduling, schedulingResponse, err_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        requiredData = ["description_scheduling", "date_scheduling", "clientId", "chatId"];
                        if (validator_1.Validator.validadeRequiredFields(requiredData, req.body))
                            return [2 /*return*/, res.status(400).send({ message: "Required fields wasn't provided" })];
                        scheduling = {
                            descriptionScheduling: req.body.description_scheduling,
                            dateScheduling: req.body.date_scheduling,
                            clientId: req.body.clientId,
                            mechanicalId: req.person.mechanicalId
                        };
                        return [4 /*yield*/, this.schedulingService.newScheduling(scheduling)];
                    case 1:
                        schedulingResponse = _a.sent();
                        return [4 /*yield*/, this.chatService.changeStatusByChat(req.body.chatId, "Scheduled")];
                    case 2:
                        _a.sent();
                        res.status(201).send({ createdScheduling: true, schedulingId: schedulingResponse.raw.insertId });
                        return [3 /*break*/, 4];
                    case 3:
                        err_4 = _a.sent();
                        res.status(500).send({ message: "Something went wrong", error: err_4 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SchedulingController.prototype.updateScheduled = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var requiredData, scheduling, err_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        requiredData = ["description_scheduling", "date_scheduling", "schedulingId"];
                        if (validator_1.Validator.validadeRequiredFields(requiredData, req.body))
                            return [2 /*return*/, res.status(400).send({ message: "Required fields wasn't provided" })];
                        scheduling = {
                            descriptionScheduling: req.body.description_scheduling,
                            dateScheduling: req.body.date_scheduling,
                            id_scheduling: req.body.schedulingId
                        };
                        return [4 /*yield*/, this.schedulingService.changeScheduling(scheduling)];
                    case 1:
                        _a.sent();
                        res.status(200).send({ updatedScheduling: true });
                        return [3 /*break*/, 3];
                    case 2:
                        err_5 = _a.sent();
                        res.status(500).send({ message: "Something went wrong", error: err_5 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SchedulingController.prototype.updateDone = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var requiredData, scheduling, err_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        requiredData = ["description_scheduling", "date_scheduling", "schedulingId", "chatId"];
                        if (validator_1.Validator.validadeRequiredFields(requiredData, req.body))
                            return [2 /*return*/, res.status(400).send({ message: "Required fields wasn't provided" })];
                        scheduling = {
                            descriptionScheduling: req.body.description_scheduling,
                            dateScheduling: req.body.date_scheduling,
                            id_scheduling: req.body.schedulingId
                        };
                        return [4 /*yield*/, this.schedulingService.changeScheduling(scheduling)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.schedulingService.changeStatusByScheduling(req.body.schedulingId, "Active")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.chatService.changeStatusByChat(req.body.chatId, "Scheduled")];
                    case 3:
                        _a.sent();
                        res.status(200).send({ updatedScheduling: true, updatedChat: true });
                        return [3 /*break*/, 5];
                    case 4:
                        err_6 = _a.sent();
                        res.status(500).send({ message: "Something went wrong", error: err_6 });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SchedulingController.prototype.concludeScheduling = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var requiredData, chatId, err_7;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        requiredData = ["schedulingId", "clientId"];
                        if (validator_1.Validator.validadeRequiredFields(requiredData, req.body))
                            return [2 /*return*/, res.status(400).send({ message: "Required fields wasn't provided" })];
                        return [4 /*yield*/, this.schedulingService.changeStatusByScheduling(req.body.schedulingId, "Inactive")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.chatService.getChatByClientAndMechanical(req.body.clientId, req.person.mechanicalId)];
                    case 2:
                        chatId = _a.sent();
                        return [4 /*yield*/, this.chatService.changeStatusByChat(chatId.id_chat, "Done")];
                    case 3:
                        _a.sent();
                        res.status(200).send({ updatedScheduling: true, updatedChat: true });
                        return [3 /*break*/, 5];
                    case 4:
                        err_7 = _a.sent();
                        res.status(500).send({ message: "Something went wrong", error: err_7 });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SchedulingController.prototype.cancelScheduling = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var requiredData, err_8;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        requiredData = ["schedulingId", "chatId"];
                        if (validator_1.Validator.validadeRequiredFields(requiredData, req.body))
                            return [2 /*return*/, res.status(400).send({ message: "Required fields wasn't provided" })];
                        return [4 /*yield*/, this.schedulingService.changeStatusByScheduling(req.body.schedulingId, "Canceled")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.chatService.changeStatusByChat(req.body.chatId, "Canceled")];
                    case 2:
                        _a.sent();
                        res.status(200).send({ updatedScheduling: true, updatedChat: true });
                        return [3 /*break*/, 4];
                    case 3:
                        err_8 = _a.sent();
                        res.status(500).send({ message: "Something went wrong", error: err_8 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        inversify_express_utils_1.httpGet("/", tokenVerify_1.tokenVerify),
        tslib_1.__param(0, inversify_express_utils_1.request()), tslib_1.__param(1, inversify_express_utils_1.response())
    ], SchedulingController.prototype, "getSchedulingsByMechanical", null);
    tslib_1.__decorate([
        inversify_express_utils_1.httpPost('/client', tokenVerify_1.tokenVerify),
        tslib_1.__param(0, inversify_express_utils_1.request()), tslib_1.__param(1, inversify_express_utils_1.response())
    ], SchedulingController.prototype, "getSchedulingByClientAndMechanical", null);
    tslib_1.__decorate([
        inversify_express_utils_1.httpPost("/mechanical", tokenVerify_1.tokenVerify),
        tslib_1.__param(0, inversify_express_utils_1.request()), tslib_1.__param(1, inversify_express_utils_1.response())
    ], SchedulingController.prototype, "getSchedulingByMechanicalAndClient", null);
    tslib_1.__decorate([
        inversify_express_utils_1.httpPost("/add", tokenVerify_1.tokenVerify),
        tslib_1.__param(0, inversify_express_utils_1.request()), tslib_1.__param(1, inversify_express_utils_1.response())
    ], SchedulingController.prototype, "newScheduling", null);
    tslib_1.__decorate([
        inversify_express_utils_1.httpPut("/update/scheduled", tokenVerify_1.tokenVerify),
        tslib_1.__param(0, inversify_express_utils_1.request()), tslib_1.__param(1, inversify_express_utils_1.response())
    ], SchedulingController.prototype, "updateScheduled", null);
    tslib_1.__decorate([
        inversify_express_utils_1.httpPut("/update/new", tokenVerify_1.tokenVerify),
        tslib_1.__param(0, inversify_express_utils_1.request()), tslib_1.__param(1, inversify_express_utils_1.response())
    ], SchedulingController.prototype, "updateDone", null);
    tslib_1.__decorate([
        inversify_express_utils_1.httpPut("/conclude", tokenVerify_1.tokenVerify),
        tslib_1.__param(0, inversify_express_utils_1.request()), tslib_1.__param(1, inversify_express_utils_1.response())
    ], SchedulingController.prototype, "concludeScheduling", null);
    tslib_1.__decorate([
        inversify_express_utils_1.httpPut("/cancel", tokenVerify_1.tokenVerify),
        tslib_1.__param(0, inversify_express_utils_1.request()), tslib_1.__param(1, inversify_express_utils_1.response())
    ], SchedulingController.prototype, "cancelScheduling", null);
    SchedulingController = tslib_1.__decorate([
        inversify_express_utils_1.controller("/scheduling"),
        tslib_1.__param(0, inversify_1.inject("SchedulingService")),
        tslib_1.__param(1, inversify_1.inject("ChatService"))
    ], SchedulingController);
    return SchedulingController;
}());
exports.SchedulingController = SchedulingController;
