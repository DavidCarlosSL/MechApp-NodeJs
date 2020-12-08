"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var inversify_1 = require("inversify");
var typeorm_1 = require("typeorm");
var code_model_1 = require("../models/code.model");
var CodeService = /** @class */ (function () {
    function CodeService() {
        this.connection = typeorm_1.getConnection('crudConn');
        this.codeRepository = this.connection.getRepository(code_model_1.Code);
    }
    CodeService.prototype.newCode = function (mechanicalId, valueCode) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var code;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.codeRepository.createQueryBuilder().insert()
                            .values({
                            valueCode: valueCode,
                            mechanicalId: mechanicalId
                        })
                            .execute()];
                    case 1:
                        code = _a.sent();
                        return [2 /*return*/, code];
                }
            });
        });
    };
    CodeService.prototype.getCodeByMechanicalAndValue = function (mechanicalId, valueCode) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var code;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.codeRepository.createQueryBuilder()
                            .where("mechanicalId = :mechanicalId AND value_code = :valueCode", { mechanicalId: mechanicalId, valueCode: valueCode })
                            .select(["id_code"])
                            .getRawOne()];
                    case 1:
                        code = _a.sent();
                        return [2 /*return*/, code];
                }
            });
        });
    };
    CodeService.prototype.changeStatusCode = function (mechanicalId, valueCode) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var code;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connection.createQueryBuilder()
                            .update(code_model_1.Code)
                            .set({ statusCode: "used" })
                            .where("mechanicalId = :mechanicalId AND value_code = :valueCode", { mechanicalId: mechanicalId, valueCode: valueCode })
                            .execute()];
                    case 1:
                        code = _a.sent();
                        return [2 /*return*/, code];
                }
            });
        });
    };
    CodeService.prototype.getStatusCode = function (codeId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var code;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.codeRepository.createQueryBuilder()
                            .where("id_code = :codeId", { codeId: codeId })
                            .select(["status_code"])
                            .getRawOne()];
                    case 1:
                        code = _a.sent();
                        return [2 /*return*/, code];
                }
            });
        });
    };
    CodeService = tslib_1.__decorate([
        inversify_1.injectable()
    ], CodeService);
    return CodeService;
}());
exports.default = CodeService;
