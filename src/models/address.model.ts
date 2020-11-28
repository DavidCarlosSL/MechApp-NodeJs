import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { State } from './state.model';
import { Mechanical } from './mechanical.model';

export interface IAddress {
    id_address?: number;
    zipAddress?: string;
    cityAddress?: string;
    neighborhoodAddress?: string;
    streetAddress?: string;
    numberAddress?: number;
    stateId?: State;
    mechanicalId?: Mechanical;
}

@Entity({name: 'address'})
export class Address {
    @PrimaryColumn('int', {
        primary: true,
        generated: true,
        nullable: false,
        name: "id_address"
    })
    id_address!: number;

    @Column('varchar', {
        nullable: false,
        name: "zip_address",
        length: "8"
    })
    zipAddress!: string;
    
    @Column('varchar', {
        nullable: false,
        name: "city_address",
        length: "120"
    })
    cityAddress!: string;

    @Column('varchar', {
        nullable: false,
        name: "neighborhood_address",
        length: "150"
    })
    neighborhoodAddress!: string;

    @Column('varchar', {
        nullable: false,
        name: "street_address",
        length: "150"
    })
    streetAddress!: string;

    @Column('int', {
        nullable: false,
        name: "number_address"
    })
    numberAddress!: number;

    @ManyToOne(type => State)
    @JoinColumn({name: "stateId", referencedColumnName: 'id_state'})
    stateId!: State;

    @ManyToOne(type => Mechanical)
    @JoinColumn({name: "mechanicalId", referencedColumnName: "id_mechanical"})
    mechanicalId!: Mechanical;
}
