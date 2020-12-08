"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var inversify_1 = require("inversify");
var typeorm_1 = require("typeorm");
var complaint_model_1 = require("../models/complaint.model");
var ComplaintService = /** @class */ (function () {
    function ComplaintService() {
        this.connection = typeorm_1.getConnection('crudConn');
        this.complaintRepository = this.connection.getRepository(complaint_model_1.Complaint);
    }
    ComplaintService.prototype.newComplaint = function (complaintData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.complaintRepository.createQueryBuilder().insert()
                            .values({
                            descriptionComplaint: complaintData.descriptionComplaint,
                            createdAt: complaintData.createdAt,
                            clientId: complaintData.clientId,
                            mechanicalId: complaintData.mechanicalId
                        })
                            .execute()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ComplaintService = tslib_1.__decorate([
        inversify_1.injectable()
    ], ComplaintService);
    return ComplaintService;
}());
exports.default = ComplaintService;
