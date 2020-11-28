import { Response, Request } from 'express';
import { inject } from 'inversify';
import { controller, httpPost, request, response, httpPut } from "inversify-express-utils";
import momenTz from 'moment-timezone';

import RatingService from '../services/rating.service';
import SchedulingService from '../services/scheduling.service';

import { IRequest } from '../models/request.model';
import { IRating } from '../models/rating.model';

import { Validator } from '../utils/validator';
import { tokenVerify } from '../middlewares/tokenVerify';

@controller("/rating")
export class RatingController {
    constructor (
        @inject("RatingService") private ratingService: RatingService,
        @inject("SchedulingService") private schedulingService: SchedulingService,
        ){}

    @httpPost("/add", tokenVerify)
    private async addRating(@request() req: IRequest, @response() res: Response) {
        try{
            const requiredData = ["score_rating", "description_rating", "mechanicalId"];
            if(Validator.validadeRequiredFields(requiredData, req.body))
                return res.status(400).send({message: "Required fields wasn't provided"});

            const now = momenTz(new Date()).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
            const rating: IRating = {
                scoreRating: req.body.score_rating,
                descriptionRating: req.body.description_rating,
                createdAt: now,
                updatedAt: now,
                clientId: req.person.clientId,
                mechanicalId: req.body.mechanicalId
            }
            const ratingResponse = await this.ratingService.newRating(rating);

            res.status(201).send({createdRating: true, ratingId: ratingResponse.raw.insertId});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }

    @httpPost("/mechanical")
    private async getRatingsByMechanical(@request() req: Request, @response() res: Response) {
        try{
            const requiredData = ["mechanicalId"];
            if(Validator.validadeRequiredFields(requiredData, req.body))
                return res.status(400).send({message: "Required fields wasn't provided"});
            
            const ratingResponse = await this.ratingService.getRatingsByMechanical(req.body.mechanicalId, req.body.limit);
            if(!ratingResponse.length)
                return res.status(200).send({haveRatings: false})
            
            res.status(200).send({haveRatings: true, ratings: ratingResponse});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }

    @httpPost("/client", tokenVerify)
    private async getRatingByClientAndMechanical(@request() req: IRequest, @response() res: Response) {
        try{
            const requiredData = ["mechanicalId"];
            if(Validator.validadeRequiredFields(requiredData, req.body))
                return res.status(400).send({message: "Required fields wasn't provided"});
            
            const ratingResponse = await this.ratingService.getRatingByClientAndMechanical(req.person.clientId, req.body.mechanicalId);
            if(!ratingResponse) {
                const schedulingResponse = await this.schedulingService.getSchedulingByClientAndMechanical(req.person.clientId, req.body.mechanicalId);
                if(schedulingResponse && schedulingResponse.status_scheduling == "Inactive")
                    return res.status(200).send({haveRating: false, canCreate: true})
                else
                    return res.status(200).send({haveRating: false, canCreate: false})
            }
            
            res.status(200).send({haveRating: true, clientRating: ratingResponse});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }

    @httpPut("/client/update", tokenVerify)
    private async updateRating(@request() req: IRequest, @response() res: Response) {
        try{
            const requiredData = ["score_rating", "description_rating", "ratingId"];
            if(Validator.validadeRequiredFields(requiredData, req.body))
                return res.status(400).send({message: "Required fields wasn't provided"});

                const now = momenTz(new Date()).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
                const rating: IRating = {
                    scoreRating: req.body.score_rating,
                    descriptionRating: req.body.description_rating,
                    updatedAt: now
                }
                await this.ratingService.updateRating(req.body.ratingId, rating);
    
                res.status(201).send({updatedRating: true});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }
}