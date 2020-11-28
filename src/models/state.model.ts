import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';

import { Address } from './address.model';

export interface IState {
    id_state: number;
    initialsState: string;
    descriptionState: string;
}

@Entity({name: 'state'})
export class State {
    @PrimaryColumn('int', {
        primary: true,
        generated: true,
        nullable: false,
        name: "id_state"
    })
    id_state!: number;

    @Column('varchar', {
        nullable: false,
        unique: true,
        name: 'initials_state',
        length: "4"
    })
    initialsState!: string;

    @Column('varchar', {
        nullable: false,
        unique: true,
        name: 'description_state',
        length: "50"
    })
    descriptionState!: string;

    @OneToMany(type => Address, address => address.stateId)
    addresses!: [];
}