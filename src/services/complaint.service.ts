import { injectable } from "inversify";
import { Connection, Repository, getConnection } from 'typeorm';

import { Complaint, IComplaint } from '../models/complaint.model';

@injectable()
export default class ComplaintService {
    private connection: Connection;
    private complaintRepository: Repository<Complaint>

    constructor() {
        this.connection = getConnection('crudConn');
        this.complaintRepository = this.connection.getRepository(Complaint);
    }

    public async newComplaint(complaintData: IComplaint) {
        await this.complaintRepository.createQueryBuilder().insert()
        .values({
            descriptionComplaint: complaintData.descriptionComplaint,
            createdAt: complaintData.createdAt,
            clientId: complaintData.clientId,
            mechanicalId: complaintData.mechanicalId
        })
        .execute();
    }
}