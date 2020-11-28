import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost, request, response, httpPut } from 'inversify-express-utils';
import AWS from 'aws-sdk';
import {v4 as uuidv4} from 'uuid';
import momentTz from 'moment-timezone';
import jwt from 'jsonwebtoken';

import ClientService from '../services/client.service';
import MechanicalService from '../services/mechanical.service';
import MailService from '../services/mail.service';

import { IClient } from '../models/client.model';
import { IRequest } from '../models/request.model';

import { Validator } from '../utils/validator';
import { generateString } from '../utils/string.generator';

import { jwtPrivateKey } from '../config/custom-environment-variables.json';
import { AWS_BUCKET_NAME, AWS_ID, AWS_SECRET } from '../config/bucketS3-config.json';

import { tokenVerify } from '../middlewares/tokenVerify';

@controller("/client")
export class ClientController {
    constructor(
        @inject("ClientService") private clientService: ClientService,
        @inject("MechanicalService") private mechanicalService: MechanicalService,
        @inject("MailService") private mailService: MailService
        ) {}

    public static transformClient (clientData: IClient) {
        const clientToken = jwt.sign({clientId: clientData.id_client}, jwtPrivateKey, {expiresIn: 3600 * 24 * 30});
        return {
            clientToken: clientToken,
            clientData: {
                nameClient: clientData.nameClient,
                emailClient: clientData.emailClient,
                imageClient: clientData.imageClient
        }};
    }

    @httpPost("/signup")
    private async signUpClient(@request() req: Request, @response() res: Response) {
        try{
            const requiredData = ["name_client", "email_client", "password_client"];
            if(Validator.validadeRequiredFields(requiredData, req.body))
                return res.status(400).send({message: "Required fields wasn't provided"});
            
            const clientResponse = await this.clientService.getClientByEmail(req.body.email_client);
            const mechanicalResponse = await this.mechanicalService.getMechanicalByEmail(req.body.email_client);
            if(clientResponse || mechanicalResponse)
                return res.status(200).send({message: "This email address is already being used", createdClient: false});
            
            const now = momentTz(new Date()).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
            const client: IClient = {
                nameClient: req.body.name_client,
                emailClient: req.body.email_client,
                passwordClient: req.body.password_client,
                createdAt: now,
                updatedAt: now
            }
            await this.clientService.newClient(client);
            
            res.status(201).send({createdClient: true});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }

    @httpPut("/profile/update/image", tokenVerify)
    private async updateClientImage(@request() req: IRequest, @response() res: Response) {
        try{
            const requiredData = ["imageBase64_client"];
            if(Validator.validadeRequiredFields(requiredData, req.body))
                return res.status(400).send({message: "Required fields wasn't provided"});

            const buf = Buffer.from(req.body.imageBase64_client.replace(/^data:image\/\w+;base64,/, ""),'base64');
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
                    await this.clientService.updateClientImage(req.person.clientId, data.Location);
            });
            res.status(200).send({uploadedImage: true, uri: `https://mechapp.s3-sa-east-1.amazonaws.com/${imageName}.png`});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }

    @httpPut("/password/change", tokenVerify)
    private async changeClientPassword(@request() req: IRequest, @response() res: Response) {
        try{
            const requiredData = ["oldPassword_client", "newPassword_client"];
            if(Validator.validadeRequiredFields(requiredData, req.body))
                return res.status(400).send({message: "Required fields wasn't provided"});
            
            const client: IClient = {
                id_client: req.person.clientId,
                passwordClient: req.body.oldPassword_client
            }
            const clientResponse = await this.clientService.getClientByIdAndPassword(client);
            if(!clientResponse)
                return res.status(200).send({passwordChanged: false})
            
            client.passwordClient = req.body.newPassword_client;
            await this.clientService.changePasswordByClient(client);

            res.status(200).send({passwordChanged: true});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }

    @httpPut("/password/forgot")
    private async forgotPassword(@request() req: Request, @response() res: Response) {
        try{
            const requiredData = ["email_client"];
            if(Validator.validadeRequiredFields(requiredData, req.body))
                return res.status(400).send({message: "Required fields wasn't provided"});

            const clientResponse = await this.clientService.getClientByEmail(req.body.email_client)
            if(!clientResponse)
                return res.status(200).send({validUser: false})
            
            const newPassword = generateString(8);
            const client: IClient = {
                emailClient: req.body.email_client,
                passwordClient: newPassword
            }
            await this.mailService.sendPassword(client.emailClient, client.passwordClient)
            await this.clientService.changePasswordByClient(client)

            res.status(200).send({validUser: true, passwordChanged: true});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }
}
