import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import moment from 'moment';

import { Chat } from './chat.model';

export interface IMessage {
    id_message?: number;
    typeSender?: string;
    content?: string;
    createdAt?: string | Date;
    chatId?: Chat | number;
}

@Entity({name: "message"})
export class Message {
    @PrimaryColumn('int', {
        primary: true,
        generated: true,
        nullable: false,
        name: "id_message"
    })
    id_message!: number;

    @Column('varchar', {
        nullable: false,
        length: "11",
        name: "typeSender"
    })
    typeSender!: string;

    @Column('varchar', {
        nullable: false,
        length: "500",
        name: "content"
    })
    content!: string;
    
    @Column("datetime", {
        nullable: false,
        name: "createdAt",
        default: moment.utc().format("YYYY-MM-DD HH:mm:ss")
    })
    createdAt!: string | Date;

    @ManyToOne(type => Chat)
    @JoinColumn({name: "chatId", referencedColumnName: "id_chat"})
    chatId!: Chat | number;
}