import { injectable } from 'inversify';
import { Connection, getConnection, Repository } from 'typeorm';

import { Client, IClient } from '../models/client.model';
import { IPerson } from '../models/person.model';

import md5 from 'md5';
import { AuthPrivateKey } from '../config/custom-environment-variables.json';

@injectable()
class ClientService {
    private connection: Connection;
    private clientRepository: Repository<Client>;

    constructor () {
        this.connection = getConnection('crudConn');
        this.clientRepository = this.connection.getRepository(Client);
    }
    
    public async getClientByEmailAndPassword(personData: IPerson) {      
        const client = await this.clientRepository.createQueryBuilder()
        .where("email_client = :clientEmail AND password_client = :clientPassword", 
        { clientEmail: personData.emailPerson, clientPassword: md5(personData.passwordPerson + AuthPrivateKey) })
        .getOne()
        return client;
    }

    public async getClientByEmail(clientEmail: string){
        const client = await this.clientRepository.createQueryBuilder()
        .where("email_client = :clientEmail", {clientEmail: clientEmail})
        .select(["email_client"])
        .getRawOne()
        return client;
    }

    public async newClient(clientData: IClient) {
        const client = await this.clientRepository.createQueryBuilder().insert()
        .values({
            nameClient: clientData.nameClient,
            emailClient: clientData.emailClient,
            passwordClient: md5(clientData.passwordClient + AuthPrivateKey),
            createdAt: clientData.createdAt,
            updatedAt: clientData.updatedAt
        })
        .execute();
        return client;
    };

    public async getClientByIdAndPassword(clientData: IClient){
        const client = await this.clientRepository.createQueryBuilder()
        .select(["id_client"])
        .where("id_client = :clientId AND password_client = :clientPassword", 
        { clientId: clientData.id_client, clientPassword: md5(clientData.passwordClient + AuthPrivateKey) })
        .getRawOne()
        return client;
    }

    public async changePasswordByClient(clientData: IClient) {
        await this.clientRepository.createQueryBuilder()
        .update(Client)
        .set({passwordClient: md5(clientData.passwordClient + AuthPrivateKey)})
        .where("id_client = :clientId OR email_client = :clientEmail", {clientId: clientData.id_client, clientEmail: clientData.emailClient})
        .execute();
    }

    public async updateClientImage(clientId: any, imagePath: string) {
        await this.clientRepository.createQueryBuilder()
        .update(Client)
        .set({imageClient: imagePath})
        .where("id_client = :clientId", {clientId: clientId})
        .execute();
    }
}

export default ClientService;