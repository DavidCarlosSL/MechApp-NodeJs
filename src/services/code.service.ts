import { injectable } from 'inversify';
import { Connection, getConnection, Repository } from 'typeorm';

import { Code } from '../models/code.model';

@injectable()
class CodeService {
    private connection: Connection;
    private codeRepository: Repository<Code>;

    constructor () {
        this.connection = getConnection('crudConn');
        this.codeRepository = this.connection.getRepository(Code);
    }

    public async newCode(mechanicalId: any, valueCode: number) {
        const code = await this.codeRepository.createQueryBuilder().insert()
        .values({
            valueCode: valueCode,
            mechanicalId: mechanicalId
        })
        .execute();
        return code;
    }

    public async getCodeByMechanicalAndValue(mechanicalId: any, valueCode: number){
        const code = await this.codeRepository.createQueryBuilder()
        .where("mechanicalId = :mechanicalId AND value_code = :valueCode", {mechanicalId: mechanicalId, valueCode: valueCode})
        .select(["id_code"])
        .getRawOne();
        return code;
    }

    public async changeStatusCode(mechanicalId: any, valueCode: number){
        const code = await this.connection.createQueryBuilder()
        .update(Code)
        .set({statusCode: "used"})
        .where("mechanicalId = :mechanicalId AND value_code = :valueCode", {mechanicalId: mechanicalId, valueCode: valueCode})
        .execute();
        return code;
    }

    public async getStatusCode(codeId: number){
        const code = await this.codeRepository.createQueryBuilder()
        .where("id_code = :codeId", {codeId: codeId})
        .select(["status_code"])
        .getRawOne();
        return code;
    }
}

export default CodeService;