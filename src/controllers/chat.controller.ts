import { Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost, request, response, httpGet } from 'inversify-express-utils';
import momentTz from 'moment-timezone';

import ChatService from '../services/chat.services';

import { IRequest } from '../models/request.model';
import { IChat } from '../models/chat.model';
import { IMessage } from '../models/message.model';

import { Validator } from '../utils/validator';
import { tokenVerify } from '../middlewares/tokenVerify';

@controller("/chat")
export class ChatController {
    constructor(@inject("ChatService") private chatService: ChatService) {}

    @httpPost("/add", tokenVerify)
    private async newChat(@request() req: IRequest, @response() res: Response) {
        try{
            const requiredData = ["mechanicalId"];
            if(Validator.validadeRequiredFields(requiredData, req.body))
                return res.status(400).send({message: "Required fields wasn't provided"});

            const chatResponse = await this.chatService.getChatByClientAndMechanical(req.person.clientId, req.body.mechanicalId);
            if(chatResponse)
                return res.status(200).send({createdChat: false, existingChat: true, chatId: chatResponse.id_chat});

            const now = momentTz(new Date()).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
            const chat: IChat = {
                clientId: req.person.clientId,
                mechanicalId: req.body.mechanicalId,
                createdAt: now,
                updatedAt: now
            }
            const newChat = await this.chatService.newChat(chat);
            
            res.status(201).send({createdChat: true, chatId: newChat.raw.insertId});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }

    @httpGet("/client", tokenVerify)
    private async getClientChats(@request() req: IRequest, @response() res: Response) {
        try{
            if(!req.person.clientId)
                return res.status(400).send({validToken: false})
            
            const chats = await this.chatService.getChatsByClient(req.person.clientId);
            if(!chats.length)
                return res.status(200).send({haveChats: false});

            res.status(200).send({haveChats: true, chats});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }

    @httpGet("/mechanical", tokenVerify)
    private async getMechanicalChats(@request() req: IRequest, @response() res: Response) {
        try{
            if(!req.person.mechanicalId)
                return res.status(400).send({validToken: false})
            
            const chats = await this.chatService.getChatsByMechanical(req.person.mechanicalId);
            if(!chats.length)
                return res.status(200).send({haveChats: false});

            res.status(200).send({haveChats: true, chats});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }

    @httpPost("/messages", tokenVerify)
    private async getMessages(@request() req: IRequest, @response() res: Response) {
        try{
            const requiredData = ["chatId", "limit"];
            if(Validator.validadeRequiredFields(requiredData, req.body))
                return res.status(400).send({message: "Required fields wasn't provided"});

            const messagesResponse = await this.chatService.getMessagesByChat(req.body.chatId, req.body.limit);
            if(!messagesResponse.length)
                return res.status(200).send({haveMessages: false});

            res.status(200).send({haveMessages: true, messages: messagesResponse});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }

    @httpPost("/sendmessage", tokenVerify)
    private async sendMessage(@request() req: IRequest, @response() res: Response) {
        try{
            const requiredData = ["typeSender", "content", "chatId"];
            if(Validator.validadeRequiredFields(requiredData, req.body))
                return res.status(400).send({message: "Required fields wasn't provided"});

            const now: string = momentTz(new Date()).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
            const message: IMessage = {
                typeSender: req.body.typeSender,
                content: req.body.content,
                createdAt: now,
                chatId: req.body.chatId
            }
            await this.chatService.sendMessage(message);
            await this.chatService.updateChat(req.body.chatId, now);

            res.status(201).send({createdMessage: true, updatedChat: true});
        }catch(err){
            res.status(500).send({message: "Something went wrong", error: err});
        }
    }
}