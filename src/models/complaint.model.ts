import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import moment from 'moment';

import { Client } from './client.model';
import { Mechanical } from './mechanical.model';

export interface IComplaint {
    id_complaint?: number;
    descriptionComplaint?: string;
    createdAt?: string | Date;
    clientId?: Client | number;
    mechanicalId?: Mechanical | number;
}

@Entity({name: 'complaint'})
export class Complaint {
    @PrimaryColumn('int', {
        primary: true,
        generated: true,
        nullable: false,
        name: 'id_complaint'
    })
    id_complaint!: number;

    @Column('varchar', {
        nullable: true,
        name: "description_complaint",
        length: "500"
    })
    descriptionComplaint!: string;

    @Column("datetime", {
        nullable: false,
        name: "createdAt",
        default: moment.utc().format("YYYY-MM-DD HH:mm:ss")
    })
    createdAt!: string | Date;

    @ManyToOne(type => Client)
    @JoinColumn({name: "clientId", referencedColumnName: "id_client"})
    clientId!: Client | number;

    @ManyToOne(type => Mechanical)
    @JoinColumn({name: "mechanicalId", referencedColumnName: "id_mechanical"})
    mechanicalId!: Mechanical | number;
}