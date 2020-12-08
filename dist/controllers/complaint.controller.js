"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var inversify_1 = require("inversify");
var inversify_express_utils_1 = require("inversify-express-utils");
var moment_timezone_1 = tslib_1.__importDefault(require("moment-timezone"));
var tokenVerify_1 = require("../middlewares/tokenVerify");
var validator_1 = require("../utils/validator");
var ComplaintController = /** @class */ (function () {
    function ComplaintController(complaintService) {
        this.complaintService = complaintService;
    }
    ComplaintController.prototype.newComplaint = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var requiredData, now, complaint, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        requiredData = ["description_complaint", "mechanicalId"];
                        if (validator_1.Validator.validadeRequiredFields(requiredData, req.body))
                            return [2 /*return*/, res.status(400).send({ message: "Required fields wasn't provided" })];
                        now = moment_timezone_1.default(new Date()).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
                        complaint = {
                            descriptionComplaint: req.body.description_complaint,
                            createdAt: now,
                            clientId: req.person.clientId,
                            mechanicalId: req.body.mechanicalId
                        };
                        return [4 /*yield*/, this.complaintService.newComplaint(complaint)];
                    case 1:
                        _a.sent();
                        res.status(201).send({ createdComplaint: true });
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
    ], ComplaintController.prototype, "newComplaint", null);
    ComplaintController = tslib_1.__decorate([
        inversify_express_utils_1.controller("/complaint"),
        tslib_1.__param(0, inversify_1.inject("ComplaintService"))
    ], ComplaintController);
    return ComplaintController;
}());
exports.default = ComplaintController;
