"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeController = void 0;
var tslib_1 = require("tslib");
var inversify_1 = require("inversify");
var inversify_express_utils_1 = require("inversify-express-utils");
var validator_1 = require("../utils/validator");
var tokenVerify_1 = require("../middlewares/tokenVerify");
var CodeController = /** @class */ (function () {
    function CodeController(codeService, mechanicalService, mailService) {
        this.codeService = codeService;
        this.mechanicalService = mechanicalService;
        this.mailService = mailService;
    }
    CodeController.prototype.newCode = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var requiredData, valueCode, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        requiredData = ["email_mechanical"];
                        if (validator_1.Validator.validadeRequiredFields(requiredData, req.body))
                            return [2 /*return*/, res.status(400).send({ message: "Required fields wasn't provided" })];
                        valueCode = Math.floor(1000 + Math.random() * 9000);
                        return [4 /*yield*/, this.codeService.newCode(req.person.mechanicalId, valueCode)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.mailService.sendCode(req.body.email_mechanical, valueCode)];
                    case 2:
                        _a.sent();
                        res.status(201).send({ createdCode: true });
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
    CodeController.prototype.validateCode = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var requiredData, codeResponse, codeStatus, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        requiredData = ["value_code"];
                        if (validator_1.Validator.validadeRequiredFields(requiredData, req.body))
                            return [2 /*return*/, res.status(400).send({ message: "Required fields wasn't provided" })];
                        return [4 /*yield*/, this.codeService.getCodeByMechanicalAndValue(req.person.mechanicalId, req.body.value_code)];
                    case 1:
                        codeResponse = _a.sent();
                        if (!codeResponse)
                            return [2 /*return*/, res.status(200).send({ foundCode: false })];
                        return [4 /*yield*/, this.codeService.getStatusCode(codeResponse.id_code)];
                    case 2:
                        codeStatus = _a.sent();
                        if (codeStatus.status_code == "used")
                            return [2 /*return*/, res.status(200).send({ foundCode: true, codeUsed: true })];
                        return [4 /*yield*/, this.codeService.changeStatusCode(req.person.mechanicalId, req.body.value_code)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.mechanicalService.changeStatusByMechanical(req.person.mechanicalId)];
                    case 4:
                        _a.sent();
                        res.status(200).send({ foundCode: true, statusChanged: true });
                        return [3 /*break*/, 6];
                    case 5:
                        err_2 = _a.sent();
                        res.status(500).send({ message: "Something went wrong", error: err_2 });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        inversify_express_utils_1.httpPost("/add", tokenVerify_1.tokenVerify),
        tslib_1.__param(0, inversify_express_utils_1.request()), tslib_1.__param(1, inversify_express_utils_1.response())
    ], CodeController.prototype, "newCode", null);
    tslib_1.__decorate([
        inversify_express_utils_1.httpPut("/validate", tokenVerify_1.tokenVerify)
    ], CodeController.prototype, "validateCode", null);
    CodeController = tslib_1.__decorate([
        inversify_express_utils_1.controller("/code"),
        tslib_1.__param(0, inversify_1.inject("CodeService")),
        tslib_1.__param(1, inversify_1.inject("MechanicalService")),
        tslib_1.__param(2, inversify_1.inject("MailService"))
    ], CodeController);
    return CodeController;
}());
exports.CodeController = CodeController;
