import { injectable } from 'inversify';
import { Connection, getConnection, Repository } from 'typeorm';

import { IAddress, Address } from '../models/address.model';

@injectable()
class AddressService {
    private connection: Connection;
    private addressRepository: Repository<Address>;

    constructor () {
        this.connection = getConnection('crudConn');
        this.addressRepository = this.connection.getRepository(Address);
    }

    public async newAddress(addressData: IAddress){
        const address = await this.addressRepository.createQueryBuilder().insert()
        .values({
            zipAddress: addressData.zipAddress,
            cityAddress: addressData.cityAddress,
            neighborhoodAddress: addressData.neighborhoodAddress,
            streetAddress: addressData.streetAddress,
            numberAddress: addressData.numberAddress,
            stateId: addressData.stateId,
            mechanicalId: addressData.mechanicalId
        })
        .execute();
        return address;
    }
}

export default AddressService;