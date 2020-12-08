"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInController = void 0;
var tslib_1 = require("tslib");
var inversify_1 = require("inversify");
var inversify_express_utils_1 = require("inversify-express-utils");
var client_controller_1 = require("./client.controller");
var mechanical_controller_1 = require("./mechanical.controller");
var validator_1 = require("../utils/validator");
var SignInController = /** @class */ (function () {
    function SignInController(clientService, mechanicalService) {
        this.clientService = clientService;
        this.mechanicalService = mechanicalService;
    }
    SignInController.prototype.signInPerson = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var requiredData, personData, clientResponse, client, mechanicalResponse, mechanical, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        requiredData = ["email_person", "password_person"];
                        if (validator_1.Validator.validadeRequiredFields(requiredData, req.body))
                            return [2 /*return*/, res.status(400).send({ message: "Required fields wasn't provided" })];
                        personData = {
                            emailPerson: req.body.email_person,
                            passwordPerson: req.body.password_person
                        };
                        return [4 /*yield*/, this.clientService.getClientByEmailAndPassword(personData)];
                    case 1:
                        clientResponse = _a.sent();
                        if (clientResponse) {
                            client = client_controller_1.ClientController.transformClient(clientResponse);
                            return [2 /*return*/, res.status(200).send({ auth: true, typePerson: clientResponse.typePerson, client: client })];
                        }
                        return [4 /*yield*/, this.mechanicalService.getMechanicalByEmailAndPassword(personData)];
                    case 2:
                        mechanicalResponse = _a.sent();
                        if (mechanicalResponse) {
                            mechanical = mechanical_controller_1.MechanicalController.transformMechanical(mechanicalResponse);
                            return [2 /*return*/, res.send({ auth: true, typePerson: mechanicalResponse.typePerson, mechanical: mechanical })];
                        }
                        return [2 /*return*/, res.status(200).send({ auth: false, message: "Email and/or password incorrect" })];
                    case 3:
                        err_1 = _a.sent();
                        res.status(500).send({ message: "Something went wrong", error: err_1 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        inversify_express_utils_1.httpPost("/signin")
    ], SignInController.prototype, "signInPerson", null);
    SignInController = tslib_1.__decorate([
        inversify_express_utils_1.controller("/person"),
        tslib_1.__param(0, inversify_1.inject("ClientService")),
        tslib_1.__param(1, inversify_1.inject("MechanicalService"))
    ], SignInController);
    return SignInController;
}());
exports.SignInController = SignInController;
