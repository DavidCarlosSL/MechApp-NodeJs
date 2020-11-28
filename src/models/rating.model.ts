import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import moment from 'moment';

import { Client } from './client.model';
import { Mechanical } from './mechanical.model';

export interface IRating {
    id_rating?: number;
    scoreRating?: number;
    descriptionRating?: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    clientId?: Client | number;
    mechanicalId?: Mechanical | number;
}

@Entity({name: "rating"})
export class Rating {
    @PrimaryColumn('int', {
        primary: true,
        generated: true,
        nullable: false,
        name: 'id_rating'
    })
    id_rating!: number;

    @Column('int', {
        nullable: false,
        default: 0,
        name: 'score_rating'
    })
    scoreRating!: number;

    @Column('varchar', {
        nullable: true,
        name: "description_rating",
        length: "250"
    })
    descriptionRating!: string;

    @Column("datetime", {
        nullable: false,
        name: "createdAt",
        default: moment.utc().format("YYYY-MM-DD HH:mm:ss")
    })
    createdAt!: string | Date;

    @Column("datetime", {
        nullable: false,
        name: "updatedAt",
        default: moment.utc().format("YYYY-MM-DD HH:mm:ss")
    })
    updatedAt!: string | Date;

    @ManyToOne(type => Client)
    @JoinColumn({name: "clientId", referencedColumnName: "id_client"})
    clientId!: Client | number;

    @ManyToOne(type => Mechanical)
    @JoinColumn({name: "mechanicalId", referencedColumnName: "id_mechanical"})
    mechanicalId!: Mechanical | number;
}