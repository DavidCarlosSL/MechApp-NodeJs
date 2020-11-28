import { injectable } from "inversify";
import { Connection, Repository, getConnection } from 'typeorm';
import { Scheduling, IScheduling } from '../models/scheduling.model';

@injectable()
class SchedulingService {
    private connection: Connection;
    private schedulingRepository: Repository<Scheduling>

    constructor() {
        this.connection = getConnection("crudConn");
        this.schedulingRepository = this.connection.getRepository(Scheduling);
    }

    private transformSchedulings(schedulings: any[]) {
        return schedulings.map((scheduling: any) => {
            const newScheduling = {
                id_scheduling: scheduling.id_scheduling,
                descriptionScheduling: scheduling.descriptionScheduling,
                statusScheduling: scheduling.statusScheduling,
                dateScheduling: scheduling.dateScheduling,
                client: {
                    clientId: scheduling.clientId.id_client,
                    nameClient: scheduling.clientId.nameClient,
                    imageClient: scheduling.clientId.imageClient
                }
            }
            return newScheduling;
        });
    }

    public async getSchedulingsByMechanical(mechanicalId: any) {
        const schedulings = await this.schedulingRepository.createQueryBuilder("scheduling")
        .innerJoinAndSelect("scheduling.clientId", "client")
        .where("mechanicalId = :mechanicalId AND status_scheduling = 'Active'", {mechanicalId: mechanicalId})
        .getMany();
        return this.transformSchedulings(schedulings);
    }

    public async newScheduling(schedulingData: IScheduling) {
        const scheduling = await this.schedulingRepository.createQueryBuilder().insert()
        .values({
            descriptionScheduling: schedulingData.descriptionScheduling,
            dateScheduling: schedulingData.dateScheduling,
            clientId: schedulingData.clientId,
            mechanicalId: schedulingData.mechanicalId
        })
        .execute();
        return scheduling;
    }

    public async changeScheduling(schedulingData: IScheduling) {
        await this.schedulingRepository.createQueryBuilder()
        .update(Scheduling)
        .set({
            descriptionScheduling: schedulingData.descriptionScheduling,
            dateScheduling: schedulingData.dateScheduling
        })
        .where("id_scheduling = :schedulingId", {schedulingId: schedulingData.id_scheduling})
        .execute();
    }

    public async changeStatusByScheduling(schedulingId: number, status: string) {
        await this.schedulingRepository.createQueryBuilder()
        .update(Scheduling)
        .set({statusScheduling: status})
        .where("id_scheduling = :schedulingId", {schedulingId: schedulingId})
        .execute();
    }

    public async getSchedulingByClientAndMechanical(clientId: any, mechanicalId: any) {
        const scheduling = await this.schedulingRepository.createQueryBuilder()
        .select(["id_scheduling", "description_scheduling", "date_scheduling", "status_scheduling"])
        .where("clientId = :clientId AND mechanicalId = :mechanicalId", {clientId: clientId, mechanicalId: mechanicalId})
        .getRawOne();
        return scheduling;
    }
}

export default SchedulingService;