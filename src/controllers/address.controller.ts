import { Response } from 'express';
import { inject } from 'inversify';
import { controller, interfaces, httpPost, request, response, httpGet } from 'inversify-express-utils';

import AddressService from '../services/address.service';

import { IRequest } from '../models/request.model';
import { IAddress } from '../models/address.model';

import { Validator } from '../utils/validator';
import { tokenVerify } from '../middlewares/tokenVerify';

@controller("/address")
export class AddressController implements interfaces.Controller {
    constructor( @inject("AddressService") private addressService: AddressService ) {}

    @httpPost("/add", tokenVerify)
    private async newAddress(@request() req: IRequest, @response() res: Response){
        try{
            const requiredData = ["zip_address", "city_address", "neighborhood_address", "street_address", "number_address", "stateId"];
            if(Validator.validadeRequiredFields(requiredData, req.body))
                return res.status(400).send({message: "Required fields wasn't provided"});
            
            const mechanicalId: any = req.person.mechanicalId;
            const address: IAddress = {
                zipAddress: req.body.zip_address,
                cityAddress: req.body.city_address,
                neighborhoodAddress: req.body.neighborhood_address,
                streetAddress: req.body.street_address,
                numberAddress: req.body.number_address,
                stateId: req.body.stateId,
                mechanicalId: mechanicalId
            };
            const addressResponse = await this.addressService.newAddress(address);
            
            res.status(201).send({createdAddress: true, addressId: addressResponse.raw.insertId});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }
}