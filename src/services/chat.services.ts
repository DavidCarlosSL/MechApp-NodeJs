import { injectable } from 'inversify';
import { Connection, getConnection, Repository } from 'typeorm';

import { Chat, IChat } from '../models/chat.model';
import { Message, IMessage } from '../models/message.model';

@injectable()
class ChatService {
    private connection: Connection;
    private chatRepository: Repository<Chat>;
    private messageRepository: Repository<Message>;

    constructor() {
        this.connection = getConnection('crudConn');
        this.chatRepository = this.connection.getRepository(Chat);
        this.messageRepository = this.connection.getRepository(Message);
    }

    public async newChat(chatData: IChat){
        const chat = await this.chatRepository.createQueryBuilder().insert()
        .values({
            clientId: chatData.clientId,
            mechanicalId: chatData.mechanicalId,
            createdAt: chatData.createdAt,
            updatedAt: chatData.updatedAt
        })
        .execute();
        return chat;
    }

    public async getChatByClientAndMechanical(clientId: any, mechanicalId: any){
        const chat = await this.chatRepository.createQueryBuilder()
        .select("id_chat")
        .where("clientId = :clientId AND mechanicalId = :mechanicalId", {clientId: clientId, mechanicalId: mechanicalId})
        .getRawOne();
        return chat;
    }

    public async getChatsByClient(clientId: any) {
        const chat = await this.chatRepository.createQueryBuilder("chat")
        .innerJoinAndSelect("chat.mechanicalId", "mechanical")
        .where("clientId = :clientId", {clientId: clientId})
        .orderBy("chat.updatedAt", "DESC")
        .select(["id_chat", "status_chat", "mechanical.id_mechanical", "mechanical.name_mechanical", "mechanical.image_mechanical", "mechanical.email_mechanical"])
        .getRawMany();
        return chat;
    }

    public async getChatsByMechanical(mechanicalId: any) {
        const chat = await this.chatRepository.createQueryBuilder("chat")
        .innerJoinAndSelect("chat.clientId", "client")
        .where("mechanicalId = :mechanicalId", {mechanicalId: mechanicalId})
        .orderBy("chat.updatedAt", "DESC")
        .select(["id_chat", "status_chat", "client.id_client", "client.name_client", "client.image_client", "client.email_client"])
        .getRawMany();
        return chat;
    }

    public async getMessagesByChat(chatId: number, limit: number) {
        const messages = await this.messageRepository.createQueryBuilder()
        .where("chatId = :chatId", {chatId: chatId})
        .orderBy("createdAt", "DESC")
        .take(limit)
        .getMany()
        return messages;
    }

    public async sendMessage(messageData: IMessage) {
        const message = await this.messageRepository.createQueryBuilder().insert()
        .values({
            typeSender: messageData.typeSender,
            content: messageData.content,
            createdAt: messageData.createdAt,
            chatId: messageData.chatId
        })
        .execute()
        return message;
    }

    public async updateChat(chatId: number, moment: string) {
        await this.connection.createQueryBuilder()
        .update(Chat)
        .set({updatedAt: moment})
        .where("id_chat = :chatId", {chatId: chatId})
        .execute();
    } 

    public async changeStatusByChat(chatId: number, status: string) {
        await this.connection.createQueryBuilder()
        .update(Chat)
        .set({statusChat: status})
        .where("id_chat = :chatId", {chatId: chatId})
        .execute();
    }
}

export default ChatService;