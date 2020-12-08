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
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_USER_PASSWORD,
    database: process.env.DB_DATABASE,
    name: process.env.DB_DATABASE,
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
    synchronize: true,
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