import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';

import ClientService from '../services/client.service';
import MechanicalService from '../services/mechanical.service';

import { ClientController } from './client.controller';
import { MechanicalController } from './mechanical.controller';

import { IPerson } from '../models/person.model';

import { Validator } from '../utils/validator';

@controller("/person")
export class SignInController {
    constructor(
        @inject("ClientService") private clientService: ClientService,
        @inject("MechanicalService") private mechanicalService: MechanicalService
    ) {}

    @httpPost("/signin")
    private async signInPerson(req: Request, res: Response) {
        try{
            const requiredData = ["email_person", "password_person"];
            if(Validator.validadeRequiredFields(requiredData, req.body))
                return res.status(400).send({message: "Required fields wasn't provided"});

            const personData: IPerson = {
                emailPerson: req.body.email_person,
                passwordPerson: req.body.password_person
            };

            const clientResponse = await this.clientService.getClientByEmailAndPassword(personData);
            if(clientResponse){
                const client = ClientController.transformClient(clientResponse);
                return res.status(200).send({auth: true, typePerson: clientResponse.typePerson, client});
            }

            const mechanicalResponse = await this.mechanicalService.getMechanicalByEmailAndPassword(personData);
            if(mechanicalResponse) {
                const mechanical = MechanicalController.transformMechanical(mechanicalResponse);
                return res.send({auth: true, typePerson: mechanicalResponse.typePerson, mechanical});
            }

            return res.status(200).send({auth: false, message: "Email and/or password incorrect"});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }
}