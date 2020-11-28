import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { Mechanical } from './mechanical.model';

export interface ICode {
    id_code?: number;
    valueCode?: number;
    statusCode?: string;
    mechanicalId?: Mechanical | number;
}

@Entity({name: "code"})
export class Code {
    @PrimaryColumn('int', {
        generated: true,
        primary: true,
        nullable: false,
        name: "id_code"
    })
    id_code!: number;

    @Column('int', {
        nullable: false,
        name: "value_code"
    })
    valueCode!: number;

    @Column('varchar', {
        nullable: false,
        default: 'valid',
        name: "status_code"
    })
    statusCode!: string;

    @ManyToOne(type => Mechanical)
    @JoinColumn({name: 'mechanicalId', referencedColumnName: 'id_mechanical'})
    mechanicalId!: Mechanical | number;
}