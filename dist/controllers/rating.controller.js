"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingController = void 0;
var tslib_1 = require("tslib");
var inversify_1 = require("inversify");
var inversify_express_utils_1 = require("inversify-express-utils");
var moment_timezone_1 = tslib_1.__importDefault(require("moment-timezone"));
var validator_1 = require("../utils/validator");
var tokenVerify_1 = require("../middlewares/tokenVerify");
var RatingController = /** @class */ (function () {
    function RatingController(ratingService, schedulingService) {
        this.ratingService = ratingService;
        this.schedulingService = schedulingService;
    }
    RatingController.prototype.addRating = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var requiredData, now, rating, ratingResponse, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        requiredData = ["score_rating", "description_rating", "mechanicalId"];
                        if (validator_1.Validator.validadeRequiredFields(requiredData, req.body))
                            return [2 /*return*/, res.status(400).send({ message: "Required fields wasn't provided" })];
                        now = moment_timezone_1.default(new Date()).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
                        rating = {
                            scoreRating: req.body.score_rating,
                            descriptionRating: req.body.description_rating,
                            createdAt: now,
                            updatedAt: now,
                            clientId: req.person.clientId,
                            mechanicalId: req.body.mechanicalId
                        };
                        return [4 /*yield*/, this.ratingService.newRating(rating)];
                    case 1:
                        ratingResponse = _a.sent();
                        res.status(201).send({ createdRating: true, ratingId: ratingResponse.raw.insertId });
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
    RatingController.prototype.getRatingsByMechanical = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var requiredData, ratingResponse, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        requiredData = ["mechanicalId"];
                        if (validator_1.Validator.validadeRequiredFields(requiredData, req.body))
                            return [2 /*return*/, res.status(400).send({ message: "Required fields wasn't provided" })];
                        return [4 /*yield*/, this.ratingService.getRatingsByMechanical(req.body.mechanicalId, req.body.limit)];
                    case 1:
                        ratingResponse = _a.sent();
                        if (!ratingResponse.length)
                            return [2 /*return*/, res.status(200).send({ haveRatings: false })];
                        res.status(200).send({ haveRatings: true, ratings: ratingResponse });
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        res.status(500).send({ message: "Something went wrong", error: err_2 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RatingController.prototype.getRatingByClientAndMechanical = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var requiredData, ratingResponse, schedulingResponse, err_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        requiredData = ["mechanicalId"];
                        if (validator_1.Validator.validadeRequiredFields(requiredData, req.body))
                            return [2 /*return*/, res.status(400).send({ message: "Required fields wasn't provided" })];
                        return [4 /*yield*/, this.ratingService.getRatingByClientAndMechanical(req.person.clientId, req.body.mechanicalId)];
                    case 1:
                        ratingResponse = _a.sent();
                        if (!!ratingResponse) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.schedulingService.getSchedulingByClientAndMechanical(req.person.clientId, req.body.mechanicalId)];
                    case 2:
                        schedulingResponse = _a.sent();
                        if (schedulingResponse && schedulingResponse.status_scheduling == "Inactive")
                            return [2 /*return*/, res.status(200).send({ haveRating: false, canCreate: true })];
                        else
                            return [2 /*return*/, res.status(200).send({ haveRating: false, canCreate: false })];
                        _a.label = 3;
                    case 3:
                        res.status(200).send({ haveRating: true, clientRating: ratingResponse });
                        return [3 /*break*/, 5];
                    case 4:
                        err_3 = _a.sent();
                        res.status(500).send({ message: "Something went wrong", error: err_3 });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    RatingController.prototype.updateRating = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var requiredData, now, rating, err_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        requiredData = ["score_rating", "description_rating", "ratingId"];
                        if (validator_1.Validator.validadeRequiredFields(requiredData, req.body))
                            return [2 /*return*/, res.status(400).send({ message: "Required fields wasn't provided" })];
                        now = moment_timezone_1.default(new Date()).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
                        rating = {
                            scoreRating: req.body.score_rating,
                            descriptionRating: req.body.description_rating,
                            updatedAt: now
                        };
                        return [4 /*yield*/, this.ratingService.updateRating(req.body.ratingId, rating)];
                    case 1:
                        _a.sent();
                        res.status(201).send({ updatedRating: true });
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        res.status(500).send({ message: "Something went wrong", error: err_4 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        inversify_express_utils_1.httpPost("/add", tokenVerify_1.tokenVerify),
        tslib_1.__param(0, inversify_express_utils_1.request()), tslib_1.__param(1, inversify_express_utils_1.response())
    ], RatingController.prototype, "addRating", null);
    tslib_1.__decorate([
        inversify_express_utils_1.httpPost("/mechanical"),
        tslib_1.__param(0, inversify_express_utils_1.request()), tslib_1.__param(1, inversify_express_utils_1.response())
    ], RatingController.prototype, "getRatingsByMechanical", null);
    tslib_1.__decorate([
        inversify_express_utils_1.httpPost("/client", tokenVerify_1.tokenVerify),
        tslib_1.__param(0, inversify_express_utils_1.request()), tslib_1.__param(1, inversify_express_utils_1.response())
    ], RatingController.prototype, "getRatingByClientAndMechanical", null);
    tslib_1.__decorate([
        inversify_express_utils_1.httpPut("/client/update", tokenVerify_1.tokenVerify),
        tslib_1.__param(0, inversify_express_utils_1.request()), tslib_1.__param(1, inversify_express_utils_1.response())
    ], RatingController.prototype, "updateRating", null);
    RatingController = tslib_1.__decorate([
        inversify_express_utils_1.controller("/rating"),
        tslib_1.__param(0, inversify_1.inject("RatingService")),
        tslib_1.__param(1, inversify_1.inject("SchedulingService"))
    ], RatingController);
    return RatingController;
}());
exports.RatingController = RatingController;
