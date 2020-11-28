import { injectable } from 'inversify';
import { Connection, getConnection, Repository } from 'typeorm';

import { Mechanical, IMechanical } from '../models/mechanical.model';
import { IPerson } from '../models/person.model';

import md5 from 'md5';
import { AuthPrivateKey } from '../config/custom-environment-variables.json';

@injectable()
class MechanicalService {
    private connection: Connection;
    private mechanicalRepository: Repository<Mechanical>;

    constructor() {
        this.connection = getConnection('crudConn');
        this.mechanicalRepository = this.connection.getRepository(Mechanical);
    }

    public async newMechanical(mechanicalData: IMechanical){
        const mechanical = await this.mechanicalRepository.createQueryBuilder().insert()
        .values({
            companyName: mechanicalData.companyName,
            cnpjMechanical: mechanicalData.cnpjMechanical,
            nameMechanical: mechanicalData.nameMechanical,
            emailMechanical: mechanicalData.emailMechanical,
            passwordMechanical: md5(mechanicalData.passwordMechanical + AuthPrivateKey),
            createdAt: mechanicalData.createdAt,
            updatedAt: mechanicalData.updatedAt
        })
        .execute();
        return mechanical;
    }

    public async getMechanicalByEmail(mechanicalEmail: string){
        const mechanical = await this.mechanicalRepository.createQueryBuilder()
        .where("email_mechanical = :mechanicalEmail", {mechanicalEmail: mechanicalEmail})
        .select(["email_mechanical"])
        .getRawOne();
        return mechanical;
    }

    public async getMechanicalByEmailAndPassword(personData: IPerson){
        const mechanical = await this.mechanicalRepository.createQueryBuilder()
        .where("email_mechanical = :mechanicalEmail AND password_mechanical = :mechanicalPassword", 
        { mechanicalEmail: personData.emailPerson, mechanicalPassword: md5(personData.passwordPerson + AuthPrivateKey) })
        .getOne()
        return mechanical;
    };

    public async getMechanicalByIdAndPassword(mechanicalData: IMechanical){
        const mechanical = await this.mechanicalRepository.createQueryBuilder()
        .select(["id_mechanical"])
        .where("id_mechanical = :mechanicalId AND password_mechanical = :mechanicalPassword", 
        { mechanicalId: mechanicalData.id_mechanical, mechanicalPassword: md5(mechanicalData.passwordMechanical + AuthPrivateKey) })
        .getRawOne()
        return mechanical;
    }

    public async changePasswordByMechanical(mechanicalData: IMechanical) {
        await this.mechanicalRepository.createQueryBuilder()
        .update(Mechanical)
        .set({passwordMechanical: md5(mechanicalData.passwordMechanical + AuthPrivateKey)})
        .where("id_mechanical = :mechanicalId OR email_mechanical = :mechanicalEmail", 
        { mechanicalId: mechanicalData.id_mechanical, mechanicalEmail: mechanicalData.emailMechanical })
        .execute();
    }

    public async updateProfileByMechanical(mechanicalData: IMechanical) {
        await this.mechanicalRepository.createQueryBuilder()
        .update(Mechanical)
        .set({descriptionMechanical: mechanicalData.descriptionMechanical, averagePrice: mechanicalData.averagePrice})
        .where("id_mechanical = :mechanicalId", {mechanicalId: mechanicalData.id_mechanical})
        .execute();
    }

    public async updateMechanicalImage(mechanicalId: any, imagePath: string) {
        await this.mechanicalRepository.createQueryBuilder()
        .update(Mechanical)
        .set({imageMechanical: imagePath})
        .where("id_mechanical = :mechanicalId", {mechanicalId: mechanicalId})
        .execute();
    }

    public async getMechanicalByCnpj(mechanicalCnpj: string){
        const mechanical = await this.mechanicalRepository.createQueryBuilder()
        .where("cnpj_mechanical = :mechanicalCnpj", {mechanicalCnpj: mechanicalCnpj})
        .select(["cnpj_mechanical"])
        .getRawOne()
        return mechanical;
    }

    public async changeStatusByMechanical(mechanicalId: any) {
        await this.connection.createQueryBuilder()
        .update(Mechanical)
        .set({verified: "true"})
        .where("id_mechanical = :mechanicalId", {mechanicalId: mechanicalId})
        .execute();
    }

    private transformMechanicals(mechanicals: Mechanical[]){
        return mechanicals.map((mechanical) => {
            let totalRatings: number = 0;
             mechanical.ratings.forEach((e) => {
                totalRatings += e.scoreRating
             });
            return {
                ...mechanical,
                averageScore: totalRatings / mechanical.ratings.length,
                ratings: undefined,
                companyName: undefined,
                cnpjMechanical: undefined,
                passwordMechanical: undefined,
                typePerson: undefined,
                verified: undefined,
                createdAt: undefined,
                updatedAt: undefined
            }
        });
    }

    public async getMechanicals(limit: number){
        const mechanicals = await this.mechanicalRepository.createQueryBuilder("mechanical")
        .leftJoinAndSelect("mechanical.categories", "category")
        .leftJoinAndSelect("mechanical.addresses", "address")
        .leftJoinAndSelect("mechanical.ratings", "rating")
        .take(limit)
        .getMany()
        return this.transformMechanicals(mechanicals);
    }

    public async getMechanicalsByName(nameMechanical: string){
        const mechanicals = await this.mechanicalRepository.createQueryBuilder("mechanical")
        .leftJoinAndSelect("mechanical.categories", "category")
        .leftJoinAndSelect("mechanical.addresses", "address")
        .leftJoinAndSelect("mechanical.ratings", "rating")
        .where("name_mechanical LIKE :nameMechanical", {nameMechanical: `%${nameMechanical}%`})
        .getMany()
        return this.transformMechanicals(mechanicals);
        
    }

    public async getMechanicalProfileById(mechanicalId: any) {
        const mechanical = await this.mechanicalRepository.createQueryBuilder("mechanical")
        .leftJoinAndSelect("mechanical.categories", "category")
        .leftJoinAndSelect("mechanical.addresses", "address")
        .leftJoinAndSelect("mechanical.ratings", "rating")
        .where("id_mechanical = :mechanicalId", {mechanicalId: mechanicalId})
        .getMany()
        return this.transformMechanicals(mechanical);
    }

    public async getMechanicalsByCategory(categoryId: string, limit: number) {
        const mechanicals = await this.mechanicalRepository.createQueryBuilder("mechanical")
        .innerJoinAndSelect("mechanical.categories", "category", "id_category = :categoryId", {categoryId: categoryId})
        .leftJoinAndSelect("mechanical.addresses", "address")
        .leftJoinAndSelect("mechanical.ratings", "rating")
        .take(limit)
        .getMany()
        return this.transformMechanicals(mechanicals);
    }
}

export default MechanicalService;