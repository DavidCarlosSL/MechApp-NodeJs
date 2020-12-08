"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CnpjController = void 0;
var tslib_1 = require("tslib");
var inversify_1 = require("inversify");
var inversify_express_utils_1 = require("inversify-express-utils");
var axios_1 = tslib_1.__importDefault(require("axios"));
var custom_environment_variables_json_1 = require("../config/custom-environment-variables.json");
var CnpjController = /** @class */ (function () {
    function CnpjController(mechanicalService) {
        this.mechanicalService = mechanicalService;
    }
    CnpjController.prototype.checkCnpj = function (cnpj, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var CNPJ, response_1, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, axios_1.default.get("https://api.cnpja.com.br/companies/" + cnpj, {
                                headers: { "authorization": custom_environment_variables_json_1.tokenCNPJJA }
                            })];
                    case 1:
                        CNPJ = _a.sent();
                        if (!CNPJ.data) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.mechanicalService.getMechanicalByCnpj(CNPJ.data.tax_id)];
                    case 2:
                        response_1 = _a.sent();
                        if (response_1)
                            return [2 /*return*/, res.status(200).send({ CNPJinUse: true })];
                        else
                            return [2 /*return*/, res.status(200).send({ CNPJinUse: false, CNPJ: CNPJ.data.tax_id, CompanyName: CNPJ.data.name })];
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        res.status(500).send({ message: "Something went wrong", error: err_1.message });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        inversify_express_utils_1.httpGet("/:cnpj"),
        tslib_1.__param(0, inversify_express_utils_1.requestParam("cnpj")), tslib_1.__param(1, inversify_express_utils_1.response())
    ], CnpjController.prototype, "checkCnpj", null);
    CnpjController = tslib_1.__decorate([
        inversify_express_utils_1.controller("/cnpj"),
        tslib_1.__param(0, inversify_1.inject("MechanicalService"))
    ], CnpjController);
    return CnpjController;
}());
exports.CnpjController = CnpjController;
