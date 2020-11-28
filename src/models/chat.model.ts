import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column, OneToMany } from 'typeorm';
import moment from 'moment';

import { Client } from './client.model';
import { Mechanical } from './mechanical.model';
import { Message } from './message.model';

export interface IChat {
    id_chat?: number;
    clientId?: Client | number;
    mechanicalId?: Mechanical | number;
    statusChat?: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

@Entity({name: "chat"})
export class Chat {
    @PrimaryColumn('int', {
        primary: true,
        generated: true,
        nullable: false,
        name: "id_chat"
    })
    id_chat!: number;

    @Column('varchar', {
        nullable: false,
        name: 'status_chat',
        length: "20",
        default: "On going"
    })
    statusChat!: string;

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

    @OneToMany(type => Message, message => message.id_message)
    messages!: Message[];
}