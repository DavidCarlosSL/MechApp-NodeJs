import { injectable } from "inversify";

import nodemailer from 'nodemailer';
import { mailConfig } from '../config/mail.config.json';

@injectable()
export default class MailService {
    public transporter = nodemailer.createTransport({
        service: mailConfig.host,
        auth: {
            user: mailConfig.user,
            pass: mailConfig.password
        }
    });

    public async sendCode(mechanicalEmail: string, valueCode: number) {
        await this.transporter.sendMail({
            from: mailConfig.user,
            to: mechanicalEmail,
            subject: "Here is your code",
            text: `Your Code is ${valueCode}. Use this code to validate your email`
        });
    }

    public async sendPassword(mechanicalEmail: any, password: any) {
        await this.transporter.sendMail({
            from: mailConfig.user,
            to: mechanicalEmail,
            subject: "Here is your new Password",
            text: `Your new password is ${password}. Use this temporary password to authenticate into Mech and then change it to a new.`
        })
    }
}