import { Entity, PrimaryColumn, Column } from 'typeorm';

export interface ICategory {
    id_category: number;
    nameCategory: string;
};

@Entity({name: 'category'})
export class Category {
    @PrimaryColumn('int', {
        generated: true,
        nullable: false,
        primary: true,
        name: 'id_category'
    })
    id_category!: number;

    @Column('varchar', {
        nullable: false,
        unique: true,
        name: 'name_category',
        length: "50"
    })
    nameCategory!: string;
}