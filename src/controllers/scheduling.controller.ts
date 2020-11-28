import { Response } from 'express';
import { inject } from 'inversify';
import { httpPost, controller, request, response, httpPut, httpGet } from 'inversify-express-utils';

import SchedulingService from '../services/scheduling.service';
import ChatService from '../services/chat.services';

import { IRequest } from '../models/request.model';
import { IScheduling } from '../models/scheduling.model';

import { Validator } from '../utils/validator';
import { tokenVerify } from '../middlewares/tokenVerify';

@controller("/scheduling")
export class SchedulingController {
    constructor(
        @inject("SchedulingService") private schedulingService: SchedulingService,
        @inject("ChatService") private chatService: ChatService
    ) {}

    @httpGet("/", tokenVerify)
    private async getSchedulingsByMechanical(@request() req: IRequest, @response() res: Response) {
        try{
            const schedulingResponse = await this.schedulingService.getSchedulingsByMechanical(req.person.mechanicalId);
            if(!schedulingResponse.length)
                return res.status(200).send({haveSchedulings: false})

            res.status(200).send({haveSchedulings: true, schedulings: schedulingResponse});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }

    @httpPost('/client', tokenVerify)
    private async getSchedulingByClientAndMechanical(@request() req: IRequest, @response() res: Response){
        try{
            const requiredData = ["clientId"];
            if(Validator.validadeRequiredFields(requiredData, req.body))
                return res.status(400).send({message: "Required fields wasn't provided"});
            
            const schedulingResponse = await this.schedulingService.getSchedulingByClientAndMechanical(req.body.clientId, req.person.mechanicalId);
            if(!schedulingResponse)
                return res.status(200).send({haveScheduling: false})
            
            return res.status(200).send({haveScheduling: true, scheduling: schedulingResponse});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }

    @httpPost("/mechanical", tokenVerify)
    private async getSchedulingByMechanicalAndClient(@request() req: IRequest, @response() res: Response){
        try{
            const requiredData = ["mechanicalId"];
            if(Validator.validadeRequiredFields(requiredData, req.body))
                return res.status(400).send({message: "Required fields wasn't provided"});
            const schedulingResponse = await this.schedulingService.getSchedulingByClientAndMechanical(req.person.clientId, req.body.mechanicalId);
            if(!schedulingResponse)
                return res.status(200).send({haveScheduling: false})
            
            return res.status(200).send({haveScheduling: true, scheduling: schedulingResponse});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }

    @httpPost("/add", tokenVerify)
    private async newScheduling(@request() req: IRequest, @response() res: Response) {
        try{
            const requiredData = ["description_scheduling", "date_scheduling", "clientId", "chatId"];
            if(Validator.validadeRequiredFields(requiredData, req.body))
                return res.status(400).send({message: "Required fields wasn't provided"});

            const scheduling: IScheduling = {
                descriptionScheduling: req.body.description_scheduling,
                dateScheduling: req.body.date_scheduling,
                clientId: req.body.clientId,
                mechanicalId: req.person.mechanicalId
            };
            const schedulingResponse = await this.schedulingService.newScheduling(scheduling);
            await this.chatService.changeStatusByChat(req.body.chatId, "Scheduled");

            res.status(201).send({createdScheduling: true, schedulingId: schedulingResponse.raw.insertId});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }

    @httpPut("/update/scheduled", tokenVerify)
    private async updateScheduled(@request() req: IRequest, @response() res: Response) {
        try{
            const requiredData = ["description_scheduling", "date_scheduling", "schedulingId"];
            if(Validator.validadeRequiredFields(requiredData, req.body))
                return res.status(400).send({message: "Required fields wasn't provided"});

            const scheduling: IScheduling = {
                descriptionScheduling: req.body.description_scheduling,
                dateScheduling: req.body.date_scheduling,
                id_scheduling: req.body.schedulingId
            }
            await this.schedulingService.changeScheduling(scheduling);
            
            res.status(200).send({updatedScheduling: true});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }

    @httpPut("/update/new", tokenVerify)
    private async updateDone(@request() req: IRequest, @response() res: Response) {
        try{
            const requiredData = ["description_scheduling", "date_scheduling", "schedulingId", "chatId"];
            if(Validator.validadeRequiredFields(requiredData, req.body))
                return res.status(400).send({message: "Required fields wasn't provided"});

            const scheduling: IScheduling = {
                descriptionScheduling: req.body.description_scheduling,
                dateScheduling: req.body.date_scheduling,
                id_scheduling: req.body.schedulingId
            }
            await this.schedulingService.changeScheduling(scheduling);
            await this.schedulingService.changeStatusByScheduling(req.body.schedulingId, "Active");
            await this.chatService.changeStatusByChat(req.body.chatId, "Scheduled");

            res.status(200).send({updatedScheduling: true, updatedChat: true});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }

    @httpPut("/conclude", tokenVerify)
    private async concludeScheduling(@request() req: IRequest, @response() res: Response) {
        try{
            const requiredData = ["schedulingId", "clientId"];
            if(Validator.validadeRequiredFields(requiredData, req.body))
                return res.status(400).send({message: "Required fields wasn't provided"});

            await this.schedulingService.changeStatusByScheduling(req.body.schedulingId, "Inactive");
            const chatId = await this.chatService.getChatByClientAndMechanical(req.body.clientId, req.person.mechanicalId);
            await this.chatService.changeStatusByChat(chatId.id_chat, "Done");

            res.status(200).send({updatedScheduling: true, updatedChat: true});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }
    
    @httpPut("/cancel", tokenVerify)
    private async cancelScheduling(@request() req: IRequest, @response() res: Response) {
        try{
            const requiredData = ["schedulingId", "chatId"];
            if(Validator.validadeRequiredFields(requiredData, req.body))
                return res.status(400).send({message: "Required fields wasn't provided"});
            
            await this.schedulingService.changeStatusByScheduling(req.body.schedulingId, "Canceled");
            await this.chatService.changeStatusByChat(req.body.chatId, "Canceled");

            res.status(200).send({updatedScheduling: true, updatedChat: true});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }
}