"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailService = exports.MailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
require('dotenv').config();
class MailService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD
            }
        });
    }
    async sendActivationMessage(to, link, name) {
        const mailOptions = {
            from: 'devtesting1203@gmail.com',
            to,
            subject: `Activation of email on ${process.env.SITE_URL}`,
            text: '',
            html: `<h1>Activation of your account on TodoList</h1>
      <h4>Dear ${name},</h4>
      <p>
        Thank you for your registration on SITE. Please click the activation link below to confirm
        your registration.
      </p>
      <a href="${process.env.SITE_URL}/authorization/activate/${link}">Activation link</a>
      <p>Thank you for your interest in OddsPortal services!</p>
      <p>Best of luck,</p>
      <p>TodoList Team</p>
      `
        };
        await this.transporter.sendMail(mailOptions, (err) => {
            if (err instanceof Error) {
                throw new Error(`Mail error: ${err.message}`);
            }
            console.log('Activation message succesfully send.');
        });
    }
    async sendResetMessage(to, link, name) {
        const mailOptions = {
            from: 'devtesting1203@gmail.com',
            to,
            subject: `Password Recovery on ${process.env.SITE_URL}`,
            text: '',
            html: `<h1>Recovery password on TodoList</h1>
      <h4>Dear ${name},</h4>
      <p>
        You are receiving this email because we received a password reset request for your account.
        Please use this link below to reset the password:
      </p>
      <a href="${process.env.SITE_URL}/authorization/restore/${link}">Reset link</a>
      <p>Thank you for your interest in OddsPortal services!</p>
      <p>Best of luck,</p>
      <p>TodoList Team</p>
      `
        };
        await this.transporter.sendMail(mailOptions, (err) => {
            if (err instanceof Error) {
                throw new Error(`Mail error: ${err.message}`);
            }
            console.log('Recovery message succesfully send.');
        });
    }
}
exports.MailService = MailService;
exports.mailService = new MailService();
//# sourceMappingURL=mail.service.js.map