"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
var tslib_1 = require("tslib");
var inversify_1 = require("inversify");
var inversify_express_utils_1 = require("inversify-express-utils");
var aws_sdk_1 = tslib_1.__importDefault(require("aws-sdk"));
var uuid_1 = require("uuid");
var moment_timezone_1 = tslib_1.__importDefault(require("moment-timezone"));
var jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
var validator_1 = require("../utils/validator");
var string_generator_1 = require("../utils/string.generator");
var custom_environment_variables_json_1 = require("../config/custom-environment-variables.json");
var bucketS3_config_json_1 = require("../config/bucketS3-config.json");
var tokenVerify_1 = require("../middlewares/tokenVerify");
var ClientController = /** @class */ (function () {
    function ClientController(clientService, mechanicalService, mailService) {
        this.clientService = clientService;
        this.mechanicalService = mechanicalService;
        this.mailService = mailService;
    }
    ClientController.transformClient = function (clientData) {
        var clientToken = jsonwebtoken_1.default.sign({ clientId: clientData.id_client }, custom_environment_variables_json_1.jwtPrivateKey, { expiresIn: 3600 * 24 * 30 });
        return {
            clientToken: clientToken,
            clientData: {
                nameClient: clientData.nameClient,
                emailClient: clientData.emailClient,
                imageClient: clientData.imageClient
            }
        };
    };
    ClientController.prototype.signUpClient = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var requiredData, clientResponse, mechanicalResponse, now, client, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        requiredData = ["name_client", "email_client", "password_client"];
                        if (validator_1.Validator.validadeRequiredFields(requiredData, req.body))
                            return [2 /*return*/, res.status(400).send({ message: "Required fields wasn't provided" })];
                        return [4 /*yield*/, this.clientService.getClientByEmail(req.body.email_client)];
                    case 1:
                        clientResponse = _a.sent();
                        return [4 /*yield*/, this.mechanicalService.getMechanicalByEmail(req.body.email_client)];
                    case 2:
                        mechanicalResponse = _a.sent();
                        if (clientResponse || mechanicalResponse)
                            return [2 /*return*/, res.status(200).send({ message: "This email address is already being used", createdClient: false })];
                        now = moment_timezone_1.default(new Date()).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
                        client = {
                            nameClient: req.body.name_client,
                            emailClient: req.body.email_client,
                            passwordClient: req.body.password_client,
                            createdAt: now,
                            updatedAt: now
                        };
                        return [4 /*yield*/, this.clientService.newClient(client)];
                    case 3:
                        _a.sent();
                        res.status(201).send({ createdClient: true });
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        res.status(500).send({ message: "Something went wrong", error: err_1 });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ClientController.prototype.updateClientImage = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var requiredData, buf, imageName, bucketS3;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                try {
                    requiredData = ["imageBase64_client"];
                    if (validator_1.Validator.validadeRequiredFields(requiredData, req.body))
                        return [2 /*return*/, res.status(400).send({ message: "Required fields wasn't provided" })];
                    buf = Buffer.from(req.body.imageBase64_client.replace(/^data:image\/\w+;base64,/, ""), 'base64');
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
                                    return [4 /*yield*/, this.clientService.updateClientImage(req.person.clientId, data.Location)];
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
    ClientController.prototype.changeClientPassword = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var requiredData, client, clientResponse, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        requiredData = ["oldPassword_client", "newPassword_client"];
                        if (validator_1.Validator.validadeRequiredFields(requiredData, req.body))
                            return [2 /*return*/, res.status(400).send({ message: "Required fields wasn't provided" })];
                        client = {
                            id_client: req.person.clientId,
                            passwordClient: req.body.oldPassword_client
                        };
                        return [4 /*yield*/, this.clientService.getClientByIdAndPassword(client)];
                    case 1:
                        clientResponse = _a.sent();
                        if (!clientResponse)
                            return [2 /*return*/, res.status(200).send({ passwordChanged: false })];
                        client.passwordClient = req.body.newPassword_client;
                        return [4 /*yield*/, this.clientService.changePasswordByClient(client)];
                    case 2:
                        _a.sent();
                        res.status(200).send({ passwordChanged: true });
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        res.status(500).send({ message: "Something went wrong", error: err_2 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ClientController.prototype.forgotPassword = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var requiredData, clientResponse, newPassword, client, err_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        requiredData = ["email_client"];
                        if (validator_1.Validator.validadeRequiredFields(requiredData, req.body))
                            return [2 /*return*/, res.status(400).send({ message: "Required fields wasn't provided" })];
                        return [4 /*yield*/, this.clientService.getClientByEmail(req.body.email_client)];
                    case 1:
                        clientResponse = _a.sent();
                        if (!clientResponse)
                            return [2 /*return*/, res.status(200).send({ validUser: false })];
                        newPassword = string_generator_1.generateString(8);
                        client = {
                            emailClient: req.body.email_client,
                            passwordClient: newPassword
                        };
                        return [4 /*yield*/, this.mailService.sendPassword(client.emailClient, client.passwordClient)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.clientService.changePasswordByClient(client)];
                    case 3:
                        _a.sent();
                        res.status(200).send({ validUser: true, passwordChanged: true });
                        return [3 /*break*/, 5];
                    case 4:
                        err_3 = _a.sent();
                        res.status(500).send({ message: "Something went wrong", error: err_3 });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        inversify_express_utils_1.httpPost("/signup"),
        tslib_1.__param(0, inversify_express_utils_1.request()), tslib_1.__param(1, inversify_express_utils_1.response())
    ], ClientController.prototype, "signUpClient", null);
    tslib_1.__decorate([
        inversify_express_utils_1.httpPut("/profile/update/image", tokenVerify_1.tokenVerify),
        tslib_1.__param(0, inversify_express_utils_1.request()), tslib_1.__param(1, inversify_express_utils_1.response())
    ], ClientController.prototype, "updateClientImage", null);
    tslib_1.__decorate([
        inversify_express_utils_1.httpPut("/password/change", tokenVerify_1.tokenVerify),
        tslib_1.__param(0, inversify_express_utils_1.request()), tslib_1.__param(1, inversify_express_utils_1.response())
    ], ClientController.prototype, "changeClientPassword", null);
    tslib_1.__decorate([
        inversify_express_utils_1.httpPut("/password/forgot"),
        tslib_1.__param(0, inversify_express_utils_1.request()), tslib_1.__param(1, inversify_express_utils_1.response())
    ], ClientController.prototype, "forgotPassword", null);
    ClientController = tslib_1.__decorate([
        inversify_express_utils_1.controller("/client"),
        tslib_1.__param(0, inversify_1.inject("ClientService")),
        tslib_1.__param(1, inversify_1.inject("MechanicalService")),
        tslib_1.__param(2, inversify_1.inject("MailService"))
    ], ClientController);
    return ClientController;
}());
exports.ClientController = ClientController;
