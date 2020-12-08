"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var inversify_1 = require("inversify");
var typeorm_1 = require("typeorm");
var address_model_1 = require("../models/address.model");
var AddressService = /** @class */ (function () {
    function AddressService() {
        this.connection = typeorm_1.getConnection('crudConn');
        this.addressRepository = this.connection.getRepository(address_model_1.Address);
    }
    AddressService.prototype.newAddress = function (addressData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var address;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.addressRepository.createQueryBuilder().insert()
                            .values({
                            zipAddress: addressData.zipAddress,
                            cityAddress: addressData.cityAddress,
                            neighborhoodAddress: addressData.neighborhoodAddress,
                            streetAddress: addressData.streetAddress,
                            numberAddress: addressData.numberAddress,
                            stateId: addressData.stateId,
                            mechanicalId: addressData.mechanicalId
                        })
                            .execute()];
                    case 1:
                        address = _a.sent();
                        return [2 /*return*/, address];
                }
            });
        });
    };
    AddressService = tslib_1.__decorate([
        inversify_1.injectable()
    ], AddressService);
    return AddressService;
}());
exports.default = AddressService;
