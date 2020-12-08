"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var inversify_1 = require("inversify");
var typeorm_1 = require("typeorm");
var mechanical_model_1 = require("../models/mechanical.model");
var md5_1 = tslib_1.__importDefault(require("md5"));
var custom_environment_variables_json_1 = require("../config/custom-environment-variables.json");
var MechanicalService = /** @class */ (function () {
    function MechanicalService() {
        this.connection = typeorm_1.getConnection('crudConn');
        this.mechanicalRepository = this.connection.getRepository(mechanical_model_1.Mechanical);
    }
    MechanicalService.prototype.newMechanical = function (mechanicalData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var mechanical;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mechanicalRepository.createQueryBuilder().insert()
                            .values({
                            companyName: mechanicalData.companyName,
                            cnpjMechanical: mechanicalData.cnpjMechanical,
                            nameMechanical: mechanicalData.nameMechanical,
                            emailMechanical: mechanicalData.emailMechanical,
                            passwordMechanical: md5_1.default(mechanicalData.passwordMechanical + custom_environment_variables_json_1.AuthPrivateKey),
                            createdAt: mechanicalData.createdAt,
                            updatedAt: mechanicalData.updatedAt
                        })
                            .execute()];
                    case 1:
                        mechanical = _a.sent();
                        return [2 /*return*/, mechanical];
                }
            });
        });
    };
    MechanicalService.prototype.getMechanicalByEmail = function (mechanicalEmail) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var mechanical;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mechanicalRepository.createQueryBuilder()
                            .where("email_mechanical = :mechanicalEmail", { mechanicalEmail: mechanicalEmail })
                            .select(["email_mechanical"])
                            .getRawOne()];
                    case 1:
                        mechanical = _a.sent();
                        return [2 /*return*/, mechanical];
                }
            });
        });
    };
    MechanicalService.prototype.getMechanicalByEmailAndPassword = function (personData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var mechanical;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mechanicalRepository.createQueryBuilder()
                            .where("email_mechanical = :mechanicalEmail AND password_mechanical = :mechanicalPassword", { mechanicalEmail: personData.emailPerson, mechanicalPassword: md5_1.default(personData.passwordPerson + custom_environment_variables_json_1.AuthPrivateKey) })
                            .getOne()];
                    case 1:
                        mechanical = _a.sent();
                        return [2 /*return*/, mechanical];
                }
            });
        });
    };
    ;
    MechanicalService.prototype.getMechanicalByIdAndPassword = function (mechanicalData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var mechanical;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mechanicalRepository.createQueryBuilder()
                            .select(["id_mechanical"])
                            .where("id_mechanical = :mechanicalId AND password_mechanical = :mechanicalPassword", { mechanicalId: mechanicalData.id_mechanical, mechanicalPassword: md5_1.default(mechanicalData.passwordMechanical + custom_environment_variables_json_1.AuthPrivateKey) })
                            .getRawOne()];
                    case 1:
                        mechanical = _a.sent();
                        return [2 /*return*/, mechanical];
                }
            });
        });
    };
    MechanicalService.prototype.changePasswordByMechanical = function (mechanicalData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mechanicalRepository.createQueryBuilder()
                            .update(mechanical_model_1.Mechanical)
                            .set({ passwordMechanical: md5_1.default(mechanicalData.passwordMechanical + custom_environment_variables_json_1.AuthPrivateKey) })
                            .where("id_mechanical = :mechanicalId OR email_mechanical = :mechanicalEmail", { mechanicalId: mechanicalData.id_mechanical, mechanicalEmail: mechanicalData.emailMechanical })
                            .execute()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MechanicalService.prototype.updateProfileByMechanical = function (mechanicalData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mechanicalRepository.createQueryBuilder()
                            .update(mechanical_model_1.Mechanical)
                            .set({ descriptionMechanical: mechanicalData.descriptionMechanical, averagePrice: mechanicalData.averagePrice })
                            .where("id_mechanical = :mechanicalId", { mechanicalId: mechanicalData.id_mechanical })
                            .execute()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MechanicalService.prototype.updateMechanicalImage = function (mechanicalId, imagePath) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mechanicalRepository.createQueryBuilder()
                            .update(mechanical_model_1.Mechanical)
                            .set({ imageMechanical: imagePath })
                            .where("id_mechanical = :mechanicalId", { mechanicalId: mechanicalId })
                            .execute()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MechanicalService.prototype.getMechanicalByCnpj = function (mechanicalCnpj) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var mechanical;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mechanicalRepository.createQueryBuilder()
                            .where("cnpj_mechanical = :mechanicalCnpj", { mechanicalCnpj: mechanicalCnpj })
                            .select(["cnpj_mechanical"])
                            .getRawOne()];
                    case 1:
                        mechanical = _a.sent();
                        return [2 /*return*/, mechanical];
                }
            });
        });
    };
    MechanicalService.prototype.changeStatusByMechanical = function (mechanicalId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connection.createQueryBuilder()
                            .update(mechanical_model_1.Mechanical)
                            .set({ verified: "true" })
                            .where("id_mechanical = :mechanicalId", { mechanicalId: mechanicalId })
                            .execute()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MechanicalService.prototype.transformMechanicals = function (mechanicals) {
        return mechanicals.map(function (mechanical) {
            var totalRatings = 0;
            mechanical.ratings.forEach(function (e) {
                totalRatings += e.scoreRating;
            });
            return tslib_1.__assign(tslib_1.__assign({}, mechanical), { averageScore: totalRatings / mechanical.ratings.length, ratings: undefined, companyName: undefined, cnpjMechanical: undefined, passwordMechanical: undefined, typePerson: undefined, verified: undefined, createdAt: undefined, updatedAt: undefined });
        });
    };
    MechanicalService.prototype.getMechanicals = function (limit) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var mechanicals;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mechanicalRepository.createQueryBuilder("mechanical")
                            .leftJoinAndSelect("mechanical.categories", "category")
                            .leftJoinAndSelect("mechanical.addresses", "address")
                            .leftJoinAndSelect("mechanical.ratings", "rating")
                            .take(limit)
                            .getMany()];
                    case 1:
                        mechanicals = _a.sent();
                        return [2 /*return*/, this.transformMechanicals(mechanicals)];
                }
            });
        });
    };
    MechanicalService.prototype.getMechanicalsByName = function (nameMechanical) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var mechanicals;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mechanicalRepository.createQueryBuilder("mechanical")
                            .leftJoinAndSelect("mechanical.categories", "category")
                            .leftJoinAndSelect("mechanical.addresses", "address")
                            .leftJoinAndSelect("mechanical.ratings", "rating")
                            .where("name_mechanical LIKE :nameMechanical", { nameMechanical: "%" + nameMechanical + "%" })
                            .getMany()];
                    case 1:
                        mechanicals = _a.sent();
                        return [2 /*return*/, this.transformMechanicals(mechanicals)];
                }
            });
        });
    };
    MechanicalService.prototype.getMechanicalProfileById = function (mechanicalId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var mechanical;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mechanicalRepository.createQueryBuilder("mechanical")
                            .leftJoinAndSelect("mechanical.categories", "category")
                            .leftJoinAndSelect("mechanical.addresses", "address")
                            .leftJoinAndSelect("mechanical.ratings", "rating")
                            .where("id_mechanical = :mechanicalId", { mechanicalId: mechanicalId })
                            .getMany()];
                    case 1:
                        mechanical = _a.sent();
                        return [2 /*return*/, this.transformMechanicals(mechanical)];
                }
            });
        });
    };
    MechanicalService.prototype.getMechanicalsByCategory = function (categoryId, limit) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var mechanicals;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mechanicalRepository.createQueryBuilder("mechanical")
                            .innerJoinAndSelect("mechanical.categories", "category", "id_category = :categoryId", { categoryId: categoryId })
                            .leftJoinAndSelect("mechanical.addresses", "address")
                            .leftJoinAndSelect("mechanical.ratings", "rating")
                            .take(limit)
                            .getMany()];
                    case 1:
                        mechanicals = _a.sent();
                        return [2 /*return*/, this.transformMechanicals(mechanicals)];
                }
            });
        });
    };
    MechanicalService = tslib_1.__decorate([
        inversify_1.injectable()
    ], MechanicalService);
    return MechanicalService;
}());
exports.default = MechanicalService;
