import { Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, requestParam, response } from 'inversify-express-utils';
import axios from 'axios';

import MechanicalService from '../services/mechanical.service';

import { tokenCNPJJA } from '../config/custom-environment-variables.json';

@controller("/cnpj")
export class CnpjController {
    constructor(@inject("MechanicalService") private mechanicalService: MechanicalService) {}

    @httpGet("/:cnpj")
    private async checkCnpj(@requestParam("cnpj") cnpj: number, @response() res: Response){
        try{
            const CNPJ = await axios.get(`https://api.cnpja.com.br/companies/${cnpj}`, {
            headers: { "authorization": tokenCNPJJA}
            });
           
            if(CNPJ.data) {
                const response = await this.mechanicalService.getMechanicalByCnpj(CNPJ.data.tax_id);
                if(response)
                    return res.status(200).send({CNPJinUse: true});
                else
                    return res.status(200).send({CNPJinUse: false, CNPJ: CNPJ.data.tax_id, CompanyName: CNPJ.data.name});
            }
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err.message});
        }
    }
}