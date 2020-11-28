import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';

import { Chat } from './chat.model';
import { Complaint } from './complaint.model';
import { Rating } from './rating.model';
import { Scheduling } from './scheduling.model';

export interface IClient {
    id_client?: number;
    nameClient?: string;
    emailClient?: string;
    passwordClient?: string;
    imageClient?: string;
    typePerson?: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

@Entity({name: 'client'})
export class Client {
    @PrimaryColumn('int', {
        generated: true,
        nullable: false,
        primary: true,
        name: 'id_client'
    })
    id_client!: number;

    @Column("varchar", {
        length: "150",
        nullable: false,
        name: "name_client"
    })
    nameClient!: string;

    @Column("varchar", {
        length: "120",
        nullable: false,
        unique: true,
        name: "email_client"
    })
    emailClient!: string;

    @Column("varchar", {
        length: "32",
        nullable: false,
        name: "password_client"
    })
    passwordClient!: string;

    @Column("varchar", {
        length: "150",
        nullable: true,
        name: "image_client"
    })
    imageClient!: string;

    @Column("varchar", {
        length: "11",
        nullable: false,
        name: "type_person",
        default: "client"
    })
    typePerson!: string;

    @Column("datetime", {
        nullable: false,
        name: "createdAt"
    })
    createdAt!: string | Date;

    @Column("datetime", {
        nullable: false,
        name: "updatedAt"
    })
    updatedAt!: string | Date;

    @OneToMany(type => Chat, chat => chat.clientId)
    chats!: Chat[];

    @OneToMany(type => Complaint, complaint => complaint.clientId)
    complaints!: Complaint[];

    @OneToMany(type => Rating, rating => rating.clientId)
    ratings!: Rating[];

    @OneToMany(type => Scheduling, scheduling => scheduling.clientId)
    schedulings!: Scheduling[];
}