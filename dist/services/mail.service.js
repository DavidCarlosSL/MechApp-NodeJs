"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var inversify_1 = require("inversify");
var nodemailer_1 = tslib_1.__importDefault(require("nodemailer"));
var mail_config_json_1 = require("../config/mail.config.json");
var MailService = /** @class */ (function () {
    function MailService() {
        this.transporter = nodemailer_1.default.createTransport({
            service: mail_config_json_1.mailConfig.host,
            auth: {
                user: mail_config_json_1.mailConfig.user,
                pass: mail_config_json_1.mailConfig.password
            }
        });
    }
    MailService.prototype.sendCode = function (mechanicalEmail, valueCode) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transporter.sendMail({
                            from: mail_config_json_1.mailConfig.user,
                            to: mechanicalEmail,
                            subject: "Here is your code",
                            text: "Your Code is " + valueCode + ". Use this code to validate your email"
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MailService.prototype.sendPassword = function (mechanicalEmail, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transporter.sendMail({
                            from: mail_config_json_1.mailConfig.user,
                            to: mechanicalEmail,
                            subject: "Here is your new Password",
                            text: "Your new password is " + password + ". Use this temporary password to authenticate into Mech and then change it to a new."
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MailService = tslib_1.__decorate([
        inversify_1.injectable()
    ], MailService);
    return MailService;
}());
exports.default = MailService;
