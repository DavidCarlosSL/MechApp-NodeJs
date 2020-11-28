import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { Client } from './client.model';
import { Mechanical } from './mechanical.model';

export interface IScheduling {
    id_scheduling?: number;
    descriptionScheduling?: string;
    dateScheduling?: string | Date;
    statusScheduling?: string;
    clientId?: Client | number;
    mechanicalId?: Mechanical | number;
}

@Entity({name: "scheduling"})
export class Scheduling {
    @PrimaryColumn('int', {
        primary: true,
        generated: true,
        nullable: false,
        name: "id_scheduling"
    })
    id_scheduling!: number;

    @Column('varchar', {
        nullable: true,
        name: "description_scheduling",
        length: "250"
    })
    descriptionScheduling!: string;

    @Column('varchar', {
        nullable: false,
        default: "Active",
        name: "status_scheduling",
        length: "10"
    })
    statusScheduling!: string;

    @Column("datetime", {
        nullable: false,
        name: "date_scheduling"
    })
    dateScheduling!: string | Date;

    @ManyToOne(type => Client)
    @JoinColumn({name: "clientId", referencedColumnName: "id_client"})
    clientId!: Client | number;

    @ManyToOne(type => Mechanical)
    @JoinColumn({name: "mechanicalId", referencedColumnName: "id_mechanical"})
    mechanicalId!: Mechanical | number;
}