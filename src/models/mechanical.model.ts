import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';

import { Category } from './category.model';
import { Rating } from './rating.model';
import { Address } from './address.model';
import { Chat } from './chat.model';
import { Code } from './code.model';
import { Complaint } from './complaint.model';
import { Scheduling } from './scheduling.model';

export interface IMechanical {
    id_mechanical?: number;
    companyName?: string;
    cnpjMechanical?: string;
    nameMechanical?: string;
    emailMechanical?: string;
    passwordMechanical?: string;
    imageMechanical?: string;
    averagePrice?: string;
    descriptionMechanical?: string;
    typePerson?: string;
    verified?: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

@Entity({name: "mechanical"})
export class Mechanical {
    @PrimaryColumn('int', {
        generated: true,
        nullable: false,
        primary: true,
        name: 'id_mechanical'
    })
    id_mechanical!: number;

    @Column('varchar', {
        length: "150",
        name: 'company_name',
        nullable: false,
        unique: true
    })
    companyName!: string;

    @Column("varchar", {
        length: "14",
        name: "cnpj_mechanical",
        nullable: false,
        unique: true
    })
    cnpjMechanical!: string;

    @Column('varchar', {
        length: "150",
        nullable: false,
        name: "name_mechanical"
    })
    nameMechanical!: string;

    @Column("varchar", {
        length: "120",
        nullable: false,
        unique: true,
        name: "email_mechanical"
    })
    emailMechanical!: string;

    @Column("varchar", {
        length: "120",
        nullable: false,
        name: "password_mechanical"
    })
    passwordMechanical!: string;

    @Column("varchar", {
        length: "150",
        nullable: true,
        name: "image_mechanical"
    })
    imageMechanical!: string;

    @Column("varchar", {
        length: "7",
        nullable: true,
        name: "average_price"
    })
    averagePrice!: string;

    @Column('varchar', {
        nullable: true,
        name: "description_mechanical",
        length: "200"
    })
    descriptionMechanical!: string;

    @Column("varchar", {
        length: "11",
        nullable: false,
        name: "type_person",
        default: "mechanical"
    })
    typePerson!: string;

    @Column("varchar" ,{
        length: "5",
        nullable: false,
        default: "false",
        name: "verified"
    })
    verified!: string;

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

    @OneToMany(type => Chat, chat => chat.mechanicalId)
    chats!: Chat[];

    @OneToMany(type => Address, address => address.mechanicalId)
    addresses!: Address[];

    @OneToMany(type => Rating, rating => rating.mechanicalId)
    ratings!: Rating[];

    @OneToMany(type => Code, code => code.mechanicalId)
    codes!: Code[];

    @OneToMany(type => Complaint, complaint => complaint.mechanicalId)
    complaints!: Complaint[];

    @OneToMany(type => Scheduling, scheduling => scheduling.mechanicalId)
    schedulings!: Scheduling[];

    @ManyToMany(type => Category)
    @JoinTable({
        name: "mechanical_categories",
        joinColumn: {name: "mechanicalId", referencedColumnName: "id_mechanical"},
        inverseJoinColumn: {name: "categoryId", referencedColumnName: "id_category"}
    })
    categories!: Category[];
}