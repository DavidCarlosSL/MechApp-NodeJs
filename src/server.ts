import "reflect-metadata";
import bodyParser from 'body-parser';
import cors from 'cors';

import { InversifyExpressServer } from 'inversify-express-utils';
import { dbConnFactory } from './database/db';

import './controllers/index.controller';
import ContainerLoader from "./services/container";

const server = new InversifyExpressServer(ContainerLoader.Load());
const port = 3000;

server.setConfig((app) => {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(cors());
});

dbConnFactory().then(() => {
    console.log("Success Database Connection");
    const app = server.build();
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
}).catch((err) => {
    console.log({message: 'Problems to connect the Database', error: err})
});