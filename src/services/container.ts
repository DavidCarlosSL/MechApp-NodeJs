import { Container } from 'inversify';

import AddressService from './address.service';
import ChatService from './chat.services';
import ClientService from './client.service';
import CodeService from './code.service';
import MechanicalService from './mechanical.service';
import SchedulingService from './scheduling.service';
import RatingService from './rating.service';
import ComplaintService from './complaint.service';
import MailService from './mail.service';
import CategoryService from './category.service';

export default class ContainerLoader {
    public static Load(): Container {
        const container = new Container();
        
        container.bind<AddressService>("AddressService").to(AddressService);
        container.bind<ChatService>("ChatService").to(ChatService);
        container.bind<ClientService>("ClientService").to(ClientService);
        container.bind<CodeService>("CodeService").to(CodeService);
        container.bind<MechanicalService>("MechanicalService").to(MechanicalService);
        container.bind<SchedulingService>("SchedulingService").to(SchedulingService);
        container.bind<RatingService>("RatingService").to(RatingService);
        container.bind<ComplaintService>("ComplaintService").to(ComplaintService);
        container.bind<MailService>("MailService").to(MailService);
        container.bind<CategoryService>("CategoryService").to(CategoryService);
        
        return container;
    }
}