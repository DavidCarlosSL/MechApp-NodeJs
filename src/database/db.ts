import { ConnectionOptions, createConnections } from 'typeorm';

import { Client } from '../models/client.model';
import { Mechanical } from '../models/mechanical.model';
import { Code } from '../models/code.model';
import { Chat } from '../models/chat.model';
import { Message } from '../models/message.model';
import { Scheduling } from '../models/scheduling.model';
import { Rating } from '../models/rating.model';
import { Complaint } from '../models/complaint.model';
import { Address } from '../models/address.model';
import { State } from '../models/state.model';
import { Category } from '../models/category.model';

const connParams: ConnectionOptions = {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    database: 'mechapp',
    name: 'mechapp',
    entities: [
        Client,
        Mechanical,
        Code,
        Chat,
        Message,
        Scheduling,
        Rating,
        Complaint,
        Address,
        State,
        Category
    ],
    synchronize: false,
    logging: true
};

const crudConn: ConnectionOptions = {
    ...connParams,
    name: 'crudConn'
};


export const dbConnFactory = () => {
    return createConnections([crudConn])
            .catch((err) => {
                console.dir(err);
                console.dir(connParams);
                console.log(`DB conn err: ${err}`);
                throw err;
            });
};