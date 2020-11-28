import { Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost, request, response } from "inversify-express-utils";
import momenTz from 'moment-timezone';

import ComplaintService from '../services/complaint.service';

import { IComplaint } from '../models/complaint.model';
import { IRequest } from '../models/request.model';

import { tokenVerify } from '../middlewares/tokenVerify';
import { Validator } from '../utils/validator';

@controller("/complaint")
export default class ComplaintController {
    constructor(@inject("ComplaintService") private complaintService: ComplaintService) {}

    @httpPost("/add", tokenVerify)
    private async newComplaint(@request() req: IRequest, @response() res: Response) {
        try{
            const requiredData = ["description_complaint", "mechanicalId"];
            if(Validator.validadeRequiredFields(requiredData, req.body))
                return res.status(400).send({message: "Required fields wasn't provided"});
            
            const now = momenTz(new Date()).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
            const complaint: IComplaint = {
                descriptionComplaint: req.body.description_complaint,
                createdAt: now,
                clientId: req.person.clientId,
                mechanicalId: req.body.mechanicalId
            }
            await this.complaintService.newComplaint(complaint);
            res.status(201).send({createdComplaint: true});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }
}