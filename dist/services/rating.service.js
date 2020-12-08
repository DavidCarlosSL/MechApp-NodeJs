"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var inversify_1 = require("inversify");
var typeorm_1 = require("typeorm");
var rating_model_1 = require("../models/rating.model");
var RatingService = /** @class */ (function () {
    function RatingService() {
        this.connection = typeorm_1.getConnection('crudConn');
        this.ratingRepository = this.connection.getRepository(rating_model_1.Rating);
    }
    RatingService.prototype.newRating = function (ratingData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var rating;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ratingRepository.createQueryBuilder().insert()
                            .values({
                            scoreRating: ratingData.scoreRating,
                            descriptionRating: ratingData.descriptionRating,
                            createdAt: ratingData.createdAt,
                            updatedAt: ratingData.updatedAt,
                            clientId: ratingData.clientId,
                            mechanicalId: ratingData.mechanicalId
                        })
                            .execute()];
                    case 1:
                        rating = _a.sent();
                        return [2 /*return*/, rating];
                }
            });
        });
    };
    RatingService.prototype.updateRating = function (ratingId, ratingData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ratingRepository.createQueryBuilder()
                            .update(rating_model_1.Rating)
                            .set({
                            scoreRating: ratingData.scoreRating,
                            descriptionRating: ratingData.descriptionRating,
                            updatedAt: ratingData.updatedAt
                        })
                            .where("id_rating = :ratingId", { ratingId: ratingId })
                            .execute()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RatingService.prototype.transformRatings = function (ratings) {
        return ratings.map(function (rating) {
            var newRating = {
                id_rating: rating.id_rating,
                scoreRating: rating.scoreRating,
                descriptionRating: rating.descriptionRating,
                updatedAt: rating.updatedAt,
                client: {
                    nameClient: rating.clientId.nameClient,
                    imageClient: rating.clientId.imageClient
                }
            };
            return newRating;
        });
    };
    RatingService.prototype.getRatingsByMechanical = function (mechanicalId, limit) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ratings;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ratingRepository.createQueryBuilder("rating")
                            .innerJoinAndSelect("rating.clientId", "client")
                            .where("mechanicalId = :mechanicalId", { mechanicalId: mechanicalId })
                            .take(limit)
                            .getMany()];
                    case 1:
                        ratings = _a.sent();
                        return [2 /*return*/, this.transformRatings(ratings)];
                }
            });
        });
    };
    RatingService.prototype.getRatingByClientAndMechanical = function (clientId, mechanicalId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var rating;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ratingRepository.createQueryBuilder("rating")
                            .innerJoinAndSelect("rating.clientId", "client", "rating.clientId = :clientId", { clientId: clientId })
                            .where("mechanicalId = :mechanicalId", { mechanicalId: mechanicalId })
                            .getOne()];
                    case 1:
                        rating = _a.sent();
                        if (rating)
                            return [2 /*return*/, this.transformRatings([rating])];
                        else
                            return [2 /*return*/, null];
                        return [2 /*return*/];
                }
            });
        });
    };
    RatingService = tslib_1.__decorate([
        inversify_1.injectable()
    ], RatingService);
    return RatingService;
}());
exports.default = RatingService;
