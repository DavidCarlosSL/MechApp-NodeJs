"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnFactory = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var client_model_1 = require("../models/client.model");
var mechanical_model_1 = require("../models/mechanical.model");
var code_model_1 = require("../models/code.model");
var chat_model_1 = require("../models/chat.model");
var message_model_1 = require("../models/message.model");
var scheduling_model_1 = require("../models/scheduling.model");
var rating_model_1 = require("../models/rating.model");
var complaint_model_1 = require("../models/complaint.model");
var address_model_1 = require("../models/address.model");
var state_model_1 = require("../models/state.model");
var category_model_1 = require("../models/category.model");
var connParams = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Mikaelly5543',
    database: 'mechapp',
    name: 'mechapp',
    entities: [
        client_model_1.Client,
        mechanical_model_1.Mechanical,
        code_model_1.Code,
        chat_model_1.Chat,
        message_model_1.Message,
        scheduling_model_1.Scheduling,
        rating_model_1.Rating,
        complaint_model_1.Complaint,
        address_model_1.Address,
        state_model_1.State,
        category_model_1.Category
    ],
    synchronize: true,
    logging: true
};
var crudConn = tslib_1.__assign(tslib_1.__assign({}, connParams), { name: 'crudConn' });
exports.dbConnFactory = function () {
    return typeorm_1.createConnections([crudConn])
        .catch(function (err) {
        console.dir(err);
        console.dir(connParams);
        console.log("DB conn err: " + err);
        throw err;
    });
};
