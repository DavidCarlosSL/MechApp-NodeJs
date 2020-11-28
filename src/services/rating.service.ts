import { injectable } from "inversify";
import { Connection, Repository, getConnection } from 'typeorm';

import { Rating, IRating } from '../models/rating.model';

@injectable()
class RatingService {
    private connection: Connection;
    private ratingRepository: Repository<Rating>;

    constructor() {
        this.connection = getConnection('crudConn');
        this.ratingRepository = this.connection.getRepository(Rating);
    }

    public async newRating(ratingData: IRating) {
        const rating = await this.ratingRepository.createQueryBuilder().insert()
        .values({
            scoreRating: ratingData.scoreRating,
            descriptionRating: ratingData.descriptionRating,
            createdAt: ratingData.createdAt,
            updatedAt: ratingData.updatedAt,
            clientId: ratingData.clientId,
            mechanicalId: ratingData.mechanicalId
        })
        .execute();
        return rating;
    }

    public async updateRating(ratingId: number, ratingData: IRating){
        await this.ratingRepository.createQueryBuilder()
        .update(Rating)
        .set({
            scoreRating: ratingData.scoreRating,
            descriptionRating: ratingData.descriptionRating,
            updatedAt: ratingData.updatedAt
        })
        .where("id_rating = :ratingId", {ratingId: ratingId})
        .execute();
    }

    private transformRatings(ratings: any[]) {
        return ratings.map((rating: any) => {
            const newRating = {
                id_rating: rating.id_rating,
                scoreRating: rating.scoreRating,
                descriptionRating: rating.descriptionRating,
                updatedAt: rating.updatedAt,
                client: {
                    nameClient: rating.clientId.nameClient,
                    imageClient: rating.clientId.imageClient
                }
            }
            return newRating;
        });
    }

    public async getRatingsByMechanical(mechanicalId: number, limit: number) {
        const ratings = await this.ratingRepository.createQueryBuilder("rating")
        .innerJoinAndSelect("rating.clientId", "client")
        .where("mechanicalId = :mechanicalId", {mechanicalId: mechanicalId})
        .take(limit)
        .getMany()
        return this.transformRatings(ratings);
    }

    public async getRatingByClientAndMechanical(clientId: any, mechanicalId: number) {
        const rating = await this.ratingRepository.createQueryBuilder("rating")
        .innerJoinAndSelect("rating.clientId", "client", "rating.clientId = :clientId", {clientId: clientId})
        .where("mechanicalId = :mechanicalId", {mechanicalId: mechanicalId})
        .getOne();
        if(rating)
            return this.transformRatings([rating]);
        else
            return null;
    }
}

export default RatingService;