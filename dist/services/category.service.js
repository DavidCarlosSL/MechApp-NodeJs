"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var inversify_1 = require("inversify");
var typeorm_1 = require("typeorm");
var category_model_1 = require("../models/category.model");
var CategoryService = /** @class */ (function () {
    function CategoryService() {
        this.connection = typeorm_1.getConnection('crudConn');
        this.categoryRepository = this.connection.getRepository(category_model_1.Category);
    }
    CategoryService.prototype.getCategories = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var categories;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.categoryRepository.createQueryBuilder()
                            .orderBy("name_category", "ASC")
                            .getMany()];
                    case 1:
                        categories = _a.sent();
                        return [2 /*return*/, categories];
                }
            });
        });
    };
    CategoryService.prototype.newRelationMechanicalCategory = function (mechanicalId, categoryId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connection.query("INSERT INTO mechanical_categories (mechanicalId, categoryId) VALUES (" + mechanicalId + ", " + categoryId + ")")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CategoryService = tslib_1.__decorate([
        inversify_1.injectable()
    ], CategoryService);
    return CategoryService;
}());
exports.default = CategoryService;
