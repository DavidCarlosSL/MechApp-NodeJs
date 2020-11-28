import { injectable } from "inversify";
import { Connection, Repository, getConnection } from 'typeorm';

import { Category } from '../models/category.model';

@injectable()
class CategoryService {
    private connection: Connection;
    private categoryRepository: Repository<Category>;

    constructor() {
        this.connection = getConnection('crudConn');
        this.categoryRepository = this.connection.getRepository(Category);
    }

    public async getCategories() {
        const categories = await this.categoryRepository.createQueryBuilder()
        .orderBy("name_category", "ASC")
        .getMany();
        return categories;
    }

    public async newRelationMechanicalCategory(mechanicalId: any, categoryId: number){
        await this.connection.query(`INSERT INTO mechanical_categories (mechanicalId, categoryId) VALUES (${mechanicalId}, ${categoryId})`)
    }
}

export default CategoryService;