import nodemailer from 'nodemailer';
export declare class MailService {
    transporter: nodemailer.Transporter<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
    constructor();
    sendActivationMessage(to: string, link: string, name: string): Promise<void>;
    sendResetMessage(to: string, link: string, name: string): Promise<void>;
}
export declare const mailService: MailService;
