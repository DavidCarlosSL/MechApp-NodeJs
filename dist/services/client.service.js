"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var inversify_1 = require("inversify");
var typeorm_1 = require("typeorm");
var client_model_1 = require("../models/client.model");
var md5_1 = tslib_1.__importDefault(require("md5"));
var custom_environment_variables_json_1 = require("../config/custom-environment-variables.json");
var ClientService = /** @class */ (function () {
    function ClientService() {
        this.connection = typeorm_1.getConnection('crudConn');
        this.clientRepository = this.connection.getRepository(client_model_1.Client);
    }
    ClientService.prototype.getClientByEmailAndPassword = function (personData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var client;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.clientRepository.createQueryBuilder()
                            .where("email_client = :clientEmail AND password_client = :clientPassword", { clientEmail: personData.emailPerson, clientPassword: md5_1.default(personData.passwordPerson + custom_environment_variables_json_1.AuthPrivateKey) })
                            .getOne()];
                    case 1:
                        client = _a.sent();
                        return [2 /*return*/, client];
                }
            });
        });
    };
    ClientService.prototype.getClientByEmail = function (clientEmail) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var client;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.clientRepository.createQueryBuilder()
                            .where("email_client = :clientEmail", { clientEmail: clientEmail })
                            .select(["email_client"])
                            .getRawOne()];
                    case 1:
                        client = _a.sent();
                        return [2 /*return*/, client];
                }
            });
        });
    };
    ClientService.prototype.newClient = function (clientData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var client;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.clientRepository.createQueryBuilder().insert()
                            .values({
                            nameClient: clientData.nameClient,
                            emailClient: clientData.emailClient,
                            passwordClient: md5_1.default(clientData.passwordClient + custom_environment_variables_json_1.AuthPrivateKey),
                            createdAt: clientData.createdAt,
                            updatedAt: clientData.updatedAt
                        })
                            .execute()];
                    case 1:
                        client = _a.sent();
                        return [2 /*return*/, client];
                }
            });
        });
    };
    ;
    ClientService.prototype.getClientByIdAndPassword = function (clientData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var client;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.clientRepository.createQueryBuilder()
                            .select(["id_client"])
                            .where("id_client = :clientId AND password_client = :clientPassword", { clientId: clientData.id_client, clientPassword: md5_1.default(clientData.passwordClient + custom_environment_variables_json_1.AuthPrivateKey) })
                            .getRawOne()];
                    case 1:
                        client = _a.sent();
                        return [2 /*return*/, client];
                }
            });
        });
    };
    ClientService.prototype.changePasswordByClient = function (clientData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.clientRepository.createQueryBuilder()
                            .update(client_model_1.Client)
                            .set({ passwordClient: md5_1.default(clientData.passwordClient + custom_environment_variables_json_1.AuthPrivateKey) })
                            .where("id_client = :clientId OR email_client = :clientEmail", { clientId: clientData.id_client, clientEmail: clientData.emailClient })
                            .execute()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ClientService.prototype.updateClientImage = function (clientId, imagePath) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.clientRepository.createQueryBuilder()
                            .update(client_model_1.Client)
                            .set({ imageClient: imagePath })
                            .where("id_client = :clientId", { clientId: clientId })
                            .execute()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ClientService = tslib_1.__decorate([
        inversify_1.injectable()
    ], ClientService);
    return ClientService;
}());
exports.default = ClientService;
