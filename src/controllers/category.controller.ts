import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, request, response, httpPost } from "inversify-express-utils";

import CategoryService from '../services/category.service';

import { IRequest } from '../models/request.model';

import { Validator } from '../utils/validator';
import { tokenVerify } from '../middlewares/tokenVerify';

@controller("/category")
export default class CategoryController {
    constructor( @inject("CategoryService") private categoryService: CategoryService ) {}

    @httpGet("/")
    private async getCategories(@request() req: Request, @response() res: Response) {
        try{
            const categoryResponse = await this.categoryService.getCategories();
            
            res.status(200).send({categories: categoryResponse});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }

    @httpPost("/mechanical/add", tokenVerify)
    private async newRelation(@request() req: IRequest, @response() res: Response) {
        try{
            const requiredData = ["categories"];
            if(Validator.validadeRequiredFields(requiredData, req.body))
                return res.status(400).send({message: "Required fields wasn't provided"});

            req.body.categories.forEach(async (category: any) => {
                await this.categoryService.newRelationMechanicalCategory(req.person.mechanicalId, category.categoryId);
            });

            res.status(201).send({createdRelation: true});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }
}