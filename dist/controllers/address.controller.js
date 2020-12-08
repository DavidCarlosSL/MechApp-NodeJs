"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressController = void 0;
var tslib_1 = require("tslib");
var inversify_1 = require("inversify");
var inversify_express_utils_1 = require("inversify-express-utils");
var validator_1 = require("../utils/validator");
var tokenVerify_1 = require("../middlewares/tokenVerify");
var AddressController = /** @class */ (function () {
    function AddressController(addressService) {
        this.addressService = addressService;
    }
    AddressController.prototype.newAddress = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var requiredData, mechanicalId, address, addressResponse, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        requiredData = ["zip_address", "city_address", "neighborhood_address", "street_address", "number_address", "stateId"];
                        if (validator_1.Validator.validadeRequiredFields(requiredData, req.body))
                            return [2 /*return*/, res.status(400).send({ message: "Required fields wasn't provided" })];
                        mechanicalId = req.person.mechanicalId;
                        address = {
                            zipAddress: req.body.zip_address,
                            cityAddress: req.body.city_address,
                            neighborhoodAddress: req.body.neighborhood_address,
                            streetAddress: req.body.street_address,
                            numberAddress: req.body.number_address,
                            stateId: req.body.stateId,
                            mechanicalId: mechanicalId
                        };
                        return [4 /*yield*/, this.addressService.newAddress(address)];
                    case 1:
                        addressResponse = _a.sent();
                        res.status(201).send({ createdAddress: true, addressId: addressResponse.raw.insertId });
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
    tslib_1.__decorate([
        inversify_express_utils_1.httpPost("/add", tokenVerify_1.tokenVerify),
        tslib_1.__param(0, inversify_express_utils_1.request()), tslib_1.__param(1, inversify_express_utils_1.response())
    ], AddressController.prototype, "newAddress", null);
    AddressController = tslib_1.__decorate([
        inversify_express_utils_1.controller("/address"),
        tslib_1.__param(0, inversify_1.inject("AddressService"))
    ], AddressController);
    return AddressController;
}());
exports.AddressController = AddressController;
