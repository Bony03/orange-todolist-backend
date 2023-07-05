"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = __importDefault(require("../services/user.service"));
const User_1 = require("../entities/User");
const mail_service_1 = require("../services/mail.service");
require('dotenv').config();
class UsersController {
    constructor(userService, mailService) {
        this.userService = userService;
        this.mailService = mailService;
        this.generateToken = (email, period = process.env.JWT_EXPIRATION) => jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET, { expiresIn: period });
        this.verifyToken = (token) => jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    }
    async hashFunc(pass) {
        const salt = await bcryptjs_1.default.genSaltSync(10);
        return bcryptjs_1.default.hash(pass, salt);
    }
    async compareFunc(pass, hash) {
        return bcryptjs_1.default.compare(pass, hash);
    }
    async register(req, res) {
        const { email, password, name } = req.body.data;
        const candidate = await this.userService.getUserByEmail(email);
        if (candidate) {
            throw new Error('User have already exist');
        }
        const newUser = new User_1.Users();
        const hashPassword = await this.hashFunc(password);
        newUser.email = email;
        newUser.name = name;
        newUser.password = hashPassword;
        newUser.isActivated = false;
        newUser.activation = (0, uuid_1.v4)();
        newUser.todos = [];
        newUser.todosCount = 0;
        const user = await this.userService.createUser(newUser);
        await this.mailService.sendActivationMessage(newUser.email, newUser.activation, user.name);
        const token = this.generateToken(user.email);
        res.json({ token, data: { email: user.email, name: user.name } });
    }
    async login(req, res) {
        const { email, password } = req.body.data;
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            throw new Error(`User with ${email} not found`);
        }
        const isPassEqual = await this.compareFunc(password, user.password);
        if (!isPassEqual) {
            throw new Error('Incorrect email or password');
        }
        const token = this.generateToken(user.email);
        res.json({ token, data: { email: user.email, name: user.name } });
    }
    async activate(req, res) {
        const activation = req.params.id;
        const user = await this.userService.getUserByAct(activation);
        if (!user) {
            throw new Error('Invalid activation link');
        }
        if (user.isActivated) {
            throw new Error('Account have been already activated');
        }
        user.isActivated = true;
        await this.userService.updateUser(user);
        res.json({ message: 'Successfully activated' });
    }
    async changePass(req, res) {
        const { user } = req.body;
        const { oldPassword, newPassword } = req.body.data;
        const isPassEqual = await this.compareFunc(oldPassword, user.password);
        if (!isPassEqual) {
            throw new Error('Old password is incorrect');
        }
        const hashPassword = await this.hashFunc(newPassword);
        user.password = hashPassword;
        await this.userService.updateUser(user);
        res.json({ message: 'Password successfully changed' });
    }
    async requestPassReset(req, res) {
        const { email } = req.body.data;
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        const token = this.generateToken(user.email);
        await this.mailService.sendResetMessage(email, token, user.name);
        res.json({ message: 'Reset link successfully send to your email' });
    }
    async restorePass(req, res) {
        const { user } = req.body;
        const { password } = req.body.data;
        const hashPassword = await this.hashFunc(password);
        user.password = hashPassword;
        await this.userService.updateUser(user);
        res.json({ message: 'Password successfully changed' });
    }
    async getUserData(req, res) {
        const { user } = req.body;
        const data = {
            name: user.name,
            email: user.email,
            id: user.id,
            isActivated: user.isActivated
        };
        const token = this.generateToken(user.email);
        res.json({ data, token, message: 'Successfully authorizated' });
    }
}
exports.UsersController = UsersController;
const userController = new UsersController(new user_service_1.default(), new mail_service_1.MailService());
exports.default = userController;
//# sourceMappingURL=user.controller.js.map