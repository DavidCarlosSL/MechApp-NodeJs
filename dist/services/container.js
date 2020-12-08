"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var inversify_1 = require("inversify");
var address_service_1 = tslib_1.__importDefault(require("./address.service"));
var chat_services_1 = tslib_1.__importDefault(require("./chat.services"));
var client_service_1 = tslib_1.__importDefault(require("./client.service"));
var code_service_1 = tslib_1.__importDefault(require("./code.service"));
var mechanical_service_1 = tslib_1.__importDefault(require("./mechanical.service"));
var scheduling_service_1 = tslib_1.__importDefault(require("./scheduling.service"));
var rating_service_1 = tslib_1.__importDefault(require("./rating.service"));
var complaint_service_1 = tslib_1.__importDefault(require("./complaint.service"));
var mail_service_1 = tslib_1.__importDefault(require("./mail.service"));
var category_service_1 = tslib_1.__importDefault(require("./category.service"));
var ContainerLoader = /** @class */ (function () {
    function ContainerLoader() {
    }
    ContainerLoader.Load = function () {
        var container = new inversify_1.Container();
        container.bind("AddressService").to(address_service_1.default);
        container.bind("ChatService").to(chat_services_1.default);
        container.bind("ClientService").to(client_service_1.default);
        container.bind("CodeService").to(code_service_1.default);
        container.bind("MechanicalService").to(mechanical_service_1.default);
        container.bind("SchedulingService").to(scheduling_service_1.default);
        container.bind("RatingService").to(rating_service_1.default);
        container.bind("ComplaintService").to(complaint_service_1.default);
        container.bind("MailService").to(mail_service_1.default);
        container.bind("CategoryService").to(category_service_1.default);
        return container;
    };
    return ContainerLoader;
}());
exports.default = ContainerLoader;
