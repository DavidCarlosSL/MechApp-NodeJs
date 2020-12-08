"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var inversify_1 = require("inversify");
var typeorm_1 = require("typeorm");
var scheduling_model_1 = require("../models/scheduling.model");
var SchedulingService = /** @class */ (function () {
    function SchedulingService() {
        this.connection = typeorm_1.getConnection("crudConn");
        this.schedulingRepository = this.connection.getRepository(scheduling_model_1.Scheduling);
    }
    SchedulingService.prototype.transformSchedulings = function (schedulings) {
        return schedulings.map(function (scheduling) {
            var newScheduling = {
                id_scheduling: scheduling.id_scheduling,
                descriptionScheduling: scheduling.descriptionScheduling,
                statusScheduling: scheduling.statusScheduling,
                dateScheduling: scheduling.dateScheduling,
                client: {
                    clientId: scheduling.clientId.id_client,
                    nameClient: scheduling.clientId.nameClient,
                    imageClient: scheduling.clientId.imageClient
                }
            };
            return newScheduling;
        });
    };
    SchedulingService.prototype.getSchedulingsByMechanical = function (mechanicalId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var schedulings;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.schedulingRepository.createQueryBuilder("scheduling")
                            .innerJoinAndSelect("scheduling.clientId", "client")
                            .where("mechanicalId = :mechanicalId AND status_scheduling = 'Active'", { mechanicalId: mechanicalId })
                            .getMany()];
                    case 1:
                        schedulings = _a.sent();
                        return [2 /*return*/, this.transformSchedulings(schedulings)];
                }
            });
        });
    };
    SchedulingService.prototype.newScheduling = function (schedulingData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var scheduling;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.schedulingRepository.createQueryBuilder().insert()
                            .values({
                            descriptionScheduling: schedulingData.descriptionScheduling,
                            dateScheduling: schedulingData.dateScheduling,
                            clientId: schedulingData.clientId,
                            mechanicalId: schedulingData.mechanicalId
                        })
                            .execute()];
                    case 1:
                        scheduling = _a.sent();
                        return [2 /*return*/, scheduling];
                }
            });
        });
    };
    SchedulingService.prototype.changeScheduling = function (schedulingData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.schedulingRepository.createQueryBuilder()
                            .update(scheduling_model_1.Scheduling)
                            .set({
                            descriptionScheduling: schedulingData.descriptionScheduling,
                            dateScheduling: schedulingData.dateScheduling
                        })
                            .where("id_scheduling = :schedulingId", { schedulingId: schedulingData.id_scheduling })
                            .execute()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SchedulingService.prototype.changeStatusByScheduling = function (schedulingId, status) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.schedulingRepository.createQueryBuilder()
                            .update(scheduling_model_1.Scheduling)
                            .set({ statusScheduling: status })
                            .where("id_scheduling = :schedulingId", { schedulingId: schedulingId })
                            .execute()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SchedulingService.prototype.getSchedulingByClientAndMechanical = function (clientId, mechanicalId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var scheduling;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.schedulingRepository.createQueryBuilder()
                            .select(["id_scheduling", "description_scheduling", "date_scheduling", "status_scheduling"])
                            .where("clientId = :clientId AND mechanicalId = :mechanicalId", { clientId: clientId, mechanicalId: mechanicalId })
                            .getRawOne()];
                    case 1:
                        scheduling = _a.sent();
                        return [2 /*return*/, scheduling];
                }
            });
        });
    };
    SchedulingService = tslib_1.__decorate([
        inversify_1.injectable()
    ], SchedulingService);
    return SchedulingService;
}());
exports.default = SchedulingService;
