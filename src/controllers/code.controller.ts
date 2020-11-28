import { Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost, request, response, httpPut } from 'inversify-express-utils';

import { IRequest } from '../models/request.model';

import CodeService from '../services/code.service';
import MechanicalService from '../services/mechanical.service';
import MailService from '../services/mail.service';

import { Validator } from '../utils/validator';
import { tokenVerify } from '../middlewares/tokenVerify';

@controller("/code")
export class CodeController {
    constructor(
        @inject("CodeService") private codeService: CodeService,
        @inject("MechanicalService") private mechanicalService: MechanicalService,
        @inject("MailService") private mailService: MailService
        ) {}
    
    @httpPost("/add", tokenVerify)
    private async newCode(@request() req: IRequest, @response() res: Response) {
        try{
            const requiredData = ["email_mechanical"];
            if(Validator.validadeRequiredFields(requiredData, req.body))
                return res.status(400).send({message: "Required fields wasn't provided"});

            const valueCode = Math.floor(1000 + Math.random() * 9000);
            
            await this.codeService.newCode(req.person.mechanicalId, valueCode);
            await this.mailService.sendCode(req.body.email_mechanical, valueCode);

            res.status(201).send({createdCode: true});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }

    @httpPut("/validate", tokenVerify)
    private async validateCode(req: IRequest, res: Response) {
        try{
            const requiredData = ["value_code"];
            if(Validator.validadeRequiredFields(requiredData, req.body))
                return res.status(400).send({message: "Required fields wasn't provided"});

            const codeResponse = await this.codeService.getCodeByMechanicalAndValue(req.person.mechanicalId, req.body.value_code);
            if(!codeResponse)
                return res.status(200).send({foundCode: false});
    
            const codeStatus = await this.codeService.getStatusCode(codeResponse.id_code);
            if(codeStatus.status_code == "used")
                return res.status(200).send({foundCode: true, codeUsed: true});

            await this.codeService.changeStatusCode(req.person.mechanicalId, req.body.value_code);
            await this.mechanicalService.changeStatusByMechanical(req.person.mechanicalId);

            res.status(200).send({foundCode: true, statusChanged: true});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }
}