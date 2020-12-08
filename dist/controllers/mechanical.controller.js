"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MechanicalController = void 0;
var tslib_1 = require("tslib");
var inversify_1 = require("inversify");
var inversify_express_utils_1 = require("inversify-express-utils");
var aws_sdk_1 = tslib_1.__importDefault(require("aws-sdk"));
var uuid_1 = require("uuid");
var moment_timezone_1 = tslib_1.__importDefault(require("moment-timezone"));
var jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
var custom_environment_variables_json_1 = require("../config/custom-environment-variables.json");
var bucketS3_config_json_1 = require("../config/bucketS3-config.json");
var validator_1 = require("../utils/validator");
var string_generator_1 = require("../utils/string.generator");
var tokenVerify_1 = require("../middlewares/tokenVerify");
var MechanicalController = /** @class */ (function () {
    function MechanicalController(clientService, mechanicalService, mailService) {
        this.clientService = clientService;
        this.mechanicalService = mechanicalService;
        this.mailService = mailService;
    }
    MechanicalController.transformMechanical = function (mechanicalData) {
        var mechanicalToken = jsonwebtoken_1.default.sign({ mechanicalId: mechanicalData.id_mechanical }, custom_environment_variables_json_1.jwtPrivateKey, { expiresIn: 3600 * 24 * 30 });
        return ({
            mechanicalToken: mechanicalToken,
            mechanicalData: {
                companyName: mechanicalData.companyName,
                cnpjMechanical: mechanicalData.cnpjMechanical,
                nameMechanical: mechanicalData.nameMechanical,
                emailMechanical: mechanicalData.emailMechanical,
                imageMechanical: mechanicalData.imageMechanical,
                verified: mechanicalData.verified,
                createdAt: mechanicalData.createdAt
            }
        });
    };
    ;
    MechanicalController.prototype.getMechanicals = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var mechanicalResponse, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.mechanicalService.getMechanicals(req.body.limit)];
                    case 1:
                        mechanicalResponse = _a.sent();
                        res.status(200).send({ mechanicals: mechanicalResponse });
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
    MechanicalController.prototype.getMechanicalsByName = function (nameMechanical, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var mechanicalResponse, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.mechanicalService.getMechanicalsByName(nameMechanical)];
                    case 1:
                        mechanicalResponse = _a.sent();
                        if (mechanicalResponse.length > 0)
                            return [2 /*return*/, res.status(200).send({ haveMechanicals: true, mechanicals: mechanicalResponse })];
                        res.status(200).send({ haveMechanicals: false });
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
    MechanicalController.prototype.getMechanicalsByCategory = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var requiredData, mechanicalResponse, err_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        requiredData = ["categoryId"];
                        if (validator_1.Validator.validadeRequiredFields(requiredData, req.body))
                            return [2 /*return*/, res.status(400).send({ message: "Required fields wasn't provided" })];
                        return [4 /*yield*/, this.mechanicalService.getMechanicalsByCategory(req.body.categoryId, req.body.limit)];
                    case 1:
                        mechanicalResponse = _a.sent();
                        res.status(200).send({ mechanicals: mechanicalResponse });
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
    MechanicalController.prototype.getOwnMechanicalProfile = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var mechanicalResponse, err_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.mechanicalService.getMechanicalProfileById(req.person.mechanicalId)];
                    case 1:
                        mechanicalResponse = _a.sent();
                        res.status(200).send({ mechanical: mechanicalResponse });
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
    MechanicalController.prototype.getMechanicalById = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var requiredData, mechanicalResponse, err_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        requiredData = ["mechanicalId"];
                        if (validator_1.Validator.validadeRequiredFields(requiredData, req.body))
                            return [2 /*return*/, res.status(400).send({ message: "Required fields wasn't provided" })];
                        return [4 /*yield*/, this.mechanicalService.getMechanicalProfileById(req.body.mechanicalId)];
                    case 1:
                        mechanicalResponse = _a.sent();
                        res.status(200).send({ mechanical: mechanicalResponse });
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
    MechanicalController.prototype.signUpMechanical = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var requiredData, responseClient, responseMechanical, now, mechanical, err_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        requiredData = ["company_name", "cnpj_mechanical", "name_mechanical", "email_mechanical", "password_mechanical"];
                        if (validator_1.Validator.validadeRequiredFields(requiredData, req.body))
                            return [2 /*return*/, res.status(400).send({ message: "Required fields wasn't provided" })];
                        return [4 /*yield*/, this.clientService.getClientByEmail(req.body.email_mechanical)];
                    case 1:
                        responseClient = _a.sent();
                        return [4 /*yield*/, this.mechanicalService.getMechanicalByEmail(req.body.email_mechanical)];
                    case 2:
                        responseMechanical = _a.sent();
                        if (responseClient || responseMechanical)
                            return [2 /*return*/, res.status(200).send({ message: "This email address is already being used", createdMechanical: false })];
                        now = moment_timezone_1.default(new Date()).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
                        mechanical = {
                            companyName: req.body.company_name,
                            cnpjMechanical: req.body.cnpj_mechanical,
                            nameMechanical: req.body.name_mechanical,
                            emailMechanical: req.body.email_mechanical,
                            passwordMechanical: req.body.password_mechanical,
                            createdAt: now,
                            updatedAt: now
                        };
                        return [4 /*yield*/, this.mechanicalService.newMechanical(mechanical)];
                    case 3:
                        _a.sent();
                        res.status(201).send({ createdMechanical: true });
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
    MechanicalController.prototype.updateMechanicalProfile = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var requiredData, mechanical, err_7;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        requiredData = ["description_mechanical", "averagePrice_mechanical"];
                        if (validator_1.Validator.validadeRequiredFields(requiredData, req.body))
                            return [2 /*return*/, res.status(400).send({ message: "Required fields wasn't provided" })];
                        mechanical = {
                            id_mechanical: req.person.mechanicalId,
                            descriptionMechanical: req.body.description_mechanical,
                            averagePrice: req.body.averagePrice_mechanical
                        };
                        return [4 /*yield*/, this.mechanicalService.updateProfileByMechanical(mechanical)];
                    case 1:
                        _a.sent();
                        res.status(200).send({ profileChanged: true });
                        return [3 /*break*/, 3];
                    case 2:
                        err_7 = _a.sent();
                        res.status(500).send({ message: "Something went wrong", error: err_7 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MechanicalController.prototype.updateMechanicalImage = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var requiredData, buf, imageName, bucketS3;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                try {
                    requiredData = ["imageBase64_mechanical"];
                    if (validator_1.Validator.validadeRequiredFields(requiredData, req.body))
                        return [2 /*return*/, res.status(400).send({ message: "Required fields wasn't provided" })];
                    buf = Buffer.from(req.body.imageBase64_mechanical.replace(/^data:image\/\w+;base64,/, ""), 'base64');
                    imageName = uuid_1.v4();
                    bucketS3 = new aws_sdk_1.default.S3({
                        accessKeyId: bucketS3_config_json_1.AWS_ID,
                        secretAccessKey: bucketS3_config_json_1.AWS_SECRET
                    });
                    bucketS3.upload({
                        Bucket: bucketS3_config_json_1.AWS_BUCKET_NAME,
                        Key: imageName + ".png",
                        Body: buf,
                        ContentEncoding: 'base64',
                        ContentType: 'image/jpeg'
                    }, function (error, data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!data) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this.mechanicalService.updateMechanicalImage(req.person.mechanicalId, data.Location)];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); });
                    res.status(200).send({ uploadedImage: true, uri: "https://mechapp.s3-sa-east-1.amazonaws.com/" + imageName + ".png" });
                }
                catch (err) {
                    res.status(500).send({ message: "Something went wrong", error: err });
                }
                return [2 /*return*/];
            });
        });
    };
    MechanicalController.prototype.changeMechanicalPassword = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var requiredData, mechanical, mechanicalResponse, err_8;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        requiredData = ["oldPassword_mechanical", "newPassword_mechanical"];
                        if (validator_1.Validator.validadeRequiredFields(requiredData, req.body))
                            return [2 /*return*/, res.status(400).send({ message: "Required fields wasn't provided" })];
                        mechanical = {
                            id_mechanical: req.person.mechanicalId,
                            passwordMechanical: req.body.oldPassword_mechanical
                        };
                        return [4 /*yield*/, this.mechanicalService.getMechanicalByIdAndPassword(mechanical)];
                    case 1:
                        mechanicalResponse = _a.sent();
                        if (!mechanicalResponse)
                            return [2 /*return*/, res.status(200).send({ passwordChanged: false })];
                        mechanical.passwordMechanical = req.body.newPassword_mechanical;
                        return [4 /*yield*/, this.mechanicalService.changePasswordByMechanical(mechanical)];
                    case 2:
                        _a.sent();
                        res.status(200).send({ passwordChanged: true });
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
    MechanicalController.prototype.forgotPassword = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var requiredData, mechanicalResponse, newPassword, mechanical, err_9;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        requiredData = ["email_mechanical"];
                        if (validator_1.Validator.validadeRequiredFields(requiredData, req.body))
                            return [2 /*return*/, res.status(400).send({ message: "Required fields wasn't provided" })];
                        return [4 /*yield*/, this.mechanicalService.getMechanicalByEmail(req.body.email_mechanical)];
                    case 1:
                        mechanicalResponse = _a.sent();
                        if (!mechanicalResponse)
                            return [2 /*return*/, res.status(200).send({ validMechanical: false })];
                        newPassword = string_generator_1.generateString(8);
                        mechanical = {
                            emailMechanical: req.body.email_mechanical,
                            passwordMechanical: newPassword
                        };
                        return [4 /*yield*/, this.mailService.sendPassword(mechanical.emailMechanical, mechanical.passwordMechanical)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.mechanicalService.changePasswordByMechanical(mechanical)];
                    case 3:
                        _a.sent();
                        res.status(200).send({ validMechanical: true, passwordChanged: true });
                        return [3 /*break*/, 5];
                    case 4:
                        err_9 = _a.sent();
                        res.status(500).send({ message: "Something went wrong", error: err_9 });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        inversify_express_utils_1.httpPost("/"),
        tslib_1.__param(0, inversify_express_utils_1.request()), tslib_1.__param(1, inversify_express_utils_1.response())
    ], MechanicalController.prototype, "getMechanicals", null);
    tslib_1.__decorate([
        inversify_express_utils_1.httpGet("/search/:nameMechanical"),
        tslib_1.__param(0, inversify_express_utils_1.requestParam("nameMechanical")), tslib_1.__param(1, inversify_express_utils_1.response())
    ], MechanicalController.prototype, "getMechanicalsByName", null);
    tslib_1.__decorate([
        inversify_express_utils_1.httpPost("/category/"),
        tslib_1.__param(0, inversify_express_utils_1.request()), tslib_1.__param(1, inversify_express_utils_1.response())
    ], MechanicalController.prototype, "getMechanicalsByCategory", null);
    tslib_1.__decorate([
        inversify_express_utils_1.httpGet("/profile/own", tokenVerify_1.tokenVerify),
        tslib_1.__param(0, inversify_express_utils_1.request()), tslib_1.__param(1, inversify_express_utils_1.response())
    ], MechanicalController.prototype, "getOwnMechanicalProfile", null);
    tslib_1.__decorate([
        inversify_express_utils_1.httpPost("/profile/"),
        tslib_1.__param(0, inversify_express_utils_1.request()), tslib_1.__param(1, inversify_express_utils_1.response())
    ], MechanicalController.prototype, "getMechanicalById", null);
    tslib_1.__decorate([
        inversify_express_utils_1.httpPost("/signup"),
        tslib_1.__param(0, inversify_express_utils_1.request()), tslib_1.__param(1, inversify_express_utils_1.response())
    ], MechanicalController.prototype, "signUpMechanical", null);
    tslib_1.__decorate([
        inversify_express_utils_1.httpPut("/profile/update", tokenVerify_1.tokenVerify),
        tslib_1.__param(0, inversify_express_utils_1.request()), tslib_1.__param(1, inversify_express_utils_1.response())
    ], MechanicalController.prototype, "updateMechanicalProfile", null);
    tslib_1.__decorate([
        inversify_express_utils_1.httpPut("/profile/update/image", tokenVerify_1.tokenVerify),
        tslib_1.__param(0, inversify_express_utils_1.request()), tslib_1.__param(1, inversify_express_utils_1.response())
    ], MechanicalController.prototype, "updateMechanicalImage", null);
    tslib_1.__decorate([
        inversify_express_utils_1.httpPut("/password/change", tokenVerify_1.tokenVerify),
        tslib_1.__param(0, inversify_express_utils_1.request()), tslib_1.__param(1, inversify_express_utils_1.response())
    ], MechanicalController.prototype, "changeMechanicalPassword", null);
    tslib_1.__decorate([
        inversify_express_utils_1.httpPut("/password/forgot"),
        tslib_1.__param(0, inversify_express_utils_1.request()), tslib_1.__param(1, inversify_express_utils_1.response())
    ], MechanicalController.prototype, "forgotPassword", null);
    MechanicalController = tslib_1.__decorate([
        inversify_express_utils_1.controller("/mechanical"),
        tslib_1.__param(0, inversify_1.inject("ClientService")),
        tslib_1.__param(1, inversify_1.inject("MechanicalService")),
        tslib_1.__param(2, inversify_1.inject("MailService"))
    ], MechanicalController);
    return MechanicalController;
}());
exports.MechanicalController = MechanicalController;
