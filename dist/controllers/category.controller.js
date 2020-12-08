"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var inversify_1 = require("inversify");
var inversify_express_utils_1 = require("inversify-express-utils");
var validator_1 = require("../utils/validator");
var tokenVerify_1 = require("../middlewares/tokenVerify");
var CategoryController = /** @class */ (function () {
    function CategoryController(categoryService) {
        this.categoryService = categoryService;
    }
    CategoryController.prototype.getCategories = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var categoryResponse, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.categoryService.getCategories()];
                    case 1:
                        categoryResponse = _a.sent();
                        res.status(200).send({ categories: categoryResponse });
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
    CategoryController.prototype.newRelation = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var requiredData;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                try {
                    requiredData = ["categories"];
                    if (validator_1.Validator.validadeRequiredFields(requiredData, req.body))
                        return [2 /*return*/, res.status(400).send({ message: "Required fields wasn't provided" })];
                    req.body.categories.forEach(function (category) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.categoryService.newRelationMechanicalCategory(req.person.mechanicalId, category.categoryId)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    res.status(201).send({ createdRelation: true });
                }
                catch (err) {
                    res.status(500).send({ message: "Something went wrong", error: err });
                }
                return [2 /*return*/];
            });
        });
    };
    tslib_1.__decorate([
        inversify_express_utils_1.httpGet("/"),
        tslib_1.__param(0, inversify_express_utils_1.request()), tslib_1.__param(1, inversify_express_utils_1.response())
    ], CategoryController.prototype, "getCategories", null);
    tslib_1.__decorate([
        inversify_express_utils_1.httpPost("/mechanical/add", tokenVerify_1.tokenVerify),
        tslib_1.__param(0, inversify_express_utils_1.request()), tslib_1.__param(1, inversify_express_utils_1.response())
    ], CategoryController.prototype, "newRelation", null);
    CategoryController = tslib_1.__decorate([
        inversify_express_utils_1.controller("/category"),
        tslib_1.__param(0, inversify_1.inject("CategoryService"))
    ], CategoryController);
    return CategoryController;
}());
exports.default = CategoryController;
