import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost, request, response, httpPut, httpGet, requestParam } from 'inversify-express-utils';
import AWS from 'aws-sdk';
import {v4 as uuidv4} from 'uuid';
import momentTz from 'moment-timezone';
import jwt from 'jsonwebtoken';

import ClientService from '../services/client.service';
import MechanicalService from '../services/mechanical.service';
import MailService from '../services/mail.service';

import { IMechanical } from '../models/mechanical.model';
import { IRequest } from '../models/request.model';

import { jwtPrivateKey } from '../config/custom-environment-variables.json';
import { AWS_BUCKET_NAME, AWS_ID, AWS_SECRET } from '../config/bucketS3-config.json';

import { Validator } from '../utils/validator';
import { generateString } from '../utils/string.generator';

import { tokenVerify } from '../middlewares/tokenVerify';

@controller("/mechanical")
export class MechanicalController {
    constructor(
        @inject("ClientService") private clientService: ClientService,
        @inject("MechanicalService") private mechanicalService: MechanicalService,
        @inject("MailService") private mailService: MailService
    ) {}

    public static transformMechanical(mechanicalData: IMechanical){
        const mechanicalToken = jwt.sign({mechanicalId: mechanicalData.id_mechanical}, jwtPrivateKey, {expiresIn: 3600 * 24 * 30});
        return ({
            mechanicalToken: mechanicalToken,
            mechanicalData: {
                companyName: mechanicalData.companyName,
                cnpjMechanical: mechanicalData.cnpjMechanical,
                nameMechanical: mechanicalData.nameMechanical,
                emailMechanical: mechanicalData.emailMechanical,
                imageMechanical: mechanicalData.imageMechanical,
                verified: mechanicalData.verified,
                createdAt: mechanicalData.createdAt
            }
        });
    };

    @httpPost("/")
    private async getMechanicals(@request() req: Request, @response() res: Response){
        try{
            const mechanicalResponse = await this.mechanicalService.getMechanicals(req.body.limit);

            res.status(200).send({mechanicals: mechanicalResponse});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }

    @httpGet("/search/:nameMechanical")
    private async getMechanicalsByName(@requestParam("nameMechanical") nameMechanical: string, @response() res: Response){
        try{
            const mechanicalResponse = await this.mechanicalService.getMechanicalsByName(nameMechanical);
            if(mechanicalResponse.length > 0)
                return res.status(200).send({haveMechanicals: true, mechanicals: mechanicalResponse});
            
            res.status(200).send({haveMechanicals: false});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }

    @httpPost("/category/")
    private async getMechanicalsByCategory(@request() req: Request, @response() res: Response) {
        try{
            const requiredData = ["categoryId"];
            if(Validator.validadeRequiredFields(requiredData, req.body))
                return res.status(400).send({message: "Required fields wasn't provided"});

            const mechanicalResponse = await this.mechanicalService.getMechanicalsByCategory(req.body.categoryId, req.body.limit);
            
            res.status(200).send({mechanicals: mechanicalResponse});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }

    @httpGet("/profile/own", tokenVerify)
    private async getOwnMechanicalProfile(@request() req: IRequest, @response() res: Response) {
        try{
            const mechanicalResponse = await this.mechanicalService.getMechanicalProfileById(req.person.mechanicalId);
            res.status(200).send({mechanical: mechanicalResponse});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }

    @httpPost("/profile/")
    private async getMechanicalById(@request() req: Request, @response() res: Response) {
        try{
            const requiredData = ["mechanicalId"];
            if(Validator.validadeRequiredFields(requiredData, req.body))
                return res.status(400).send({message: "Required fields wasn't provided"});
            
            const mechanicalResponse = await this.mechanicalService.getMechanicalProfileById(req.body.mechanicalId);
            res.status(200).send({mechanical: mechanicalResponse});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }

    @httpPost("/signup")
    private async signUpMechanical(@request() req: Request, @response() res: Response){
        try{
            const requiredData = ["company_name", "cnpj_mechanical", "name_mechanical", "email_mechanical", "password_mechanical"];
            if(Validator.validadeRequiredFields(requiredData, req.body))
                return res.status(400).send({message: "Required fields wasn't provided"});
            
            const responseClient = await this.clientService.getClientByEmail(req.body.email_mechanical);
            const responseMechanical = await this.mechanicalService.getMechanicalByEmail(req.body.email_mechanical);
            if(responseClient || responseMechanical)
                return res.status(200).send({message: "This email address is already being used", createdMechanical: false});

            const now = momentTz(new Date()).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
            const mechanical: IMechanical = {
                companyName: req.body.company_name,
                cnpjMechanical: req.body.cnpj_mechanical,
                nameMechanical: req.body.name_mechanical,
                emailMechanical: req.body.email_mechanical,
                passwordMechanical: req.body.password_mechanical,
                createdAt: now,
                updatedAt: now
            };

            await this.mechanicalService.newMechanical(mechanical);
            
            res.status(201).send({createdMechanical: true});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }

    @httpPut("/profile/update", tokenVerify)
    private async updateMechanicalProfile(@request() req: IRequest, @response() res: Response) {
        try{
            const requiredData = ["description_mechanical", "averagePrice_mechanical"];
            if(Validator.validadeRequiredFields(requiredData, req.body))
                return res.status(400).send({message: "Required fields wasn't provided"});

            const mechanical: IMechanical = {
                id_mechanical: req.person.mechanicalId,
                descriptionMechanical: req.body.description_mechanical,
                averagePrice: req.body.averagePrice_mechanical
            }

            await this.mechanicalService.updateProfileByMechanical(mechanical);

            res.status(200).send({profileChanged: true});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }

    @httpPut("/profile/update/image", tokenVerify)
    private async updateMechanicalImage(@request() req: IRequest, @response() res: Response) {
        try{
            const requiredData = ["imageBase64_mechanical"];
            if(Validator.validadeRequiredFields(requiredData, req.body))
                return res.status(400).send({message: "Required fields wasn't provided"});

            const buf = Buffer.from(req.body.imageBase64_mechanical.replace(/^data:image\/\w+;base64,/, ""),'base64');
            const imageName = uuidv4();

            const bucketS3 = new AWS.S3({
                accessKeyId: AWS_ID,
                secretAccessKey: AWS_SECRET
            });

            bucketS3.upload({
                Bucket: AWS_BUCKET_NAME,
                Key: `${imageName}.png`,
                Body: buf,
                ContentEncoding: 'base64',
                ContentType: 'image/jpeg'
            }, async (error, data) => {
                if(data)
                    await this.mechanicalService.updateMechanicalImage(req.person.mechanicalId, data.Location);
            });
            res.status(200).send({uploadedImage: true, uri: `https://mechapp.s3-sa-east-1.amazonaws.com/${imageName}.png`});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }

    @httpPut("/password/change", tokenVerify)
    private async changeMechanicalPassword(@request() req: IRequest, @response() res: Response) {
        try{
            const requiredData = ["oldPassword_mechanical", "newPassword_mechanical"];
            if(Validator.validadeRequiredFields(requiredData, req.body))
                return res.status(400).send({message: "Required fields wasn't provided"});
            
            const mechanical: IMechanical = {
                id_mechanical: req.person.mechanicalId,
                passwordMechanical: req.body.oldPassword_mechanical
            }
            const mechanicalResponse = await this.mechanicalService.getMechanicalByIdAndPassword(mechanical);
            if(!mechanicalResponse)
                return res.status(200).send({passwordChanged: false})
            
            mechanical.passwordMechanical = req.body.newPassword_mechanical;
            await this.mechanicalService.changePasswordByMechanical(mechanical);

            res.status(200).send({passwordChanged: true});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }

    @httpPut("/password/forgot")
    private async forgotPassword(@request() req: Request, @response() res: Response) {
        try{
            const requiredData = ["email_mechanical"];
            if(Validator.validadeRequiredFields(requiredData, req.body))
                return res.status(400).send({message: "Required fields wasn't provided"});

            const mechanicalResponse = await this.mechanicalService.getMechanicalByEmail(req.body.email_mechanical)
            if(!mechanicalResponse)
                return res.status(200).send({validMechanical: false})
            
            const newPassword = generateString(8);
            const mechanical: IMechanical = {
                emailMechanical: req.body.email_mechanical,
                passwordMechanical: newPassword
            }
            await this.mailService.sendPassword(mechanical.emailMechanical, mechanical.passwordMechanical)
            await this.mechanicalService.changePasswordByMechanical(mechanical);

            res.status(200).send({validMechanical: true, passwordChanged: true});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }
}