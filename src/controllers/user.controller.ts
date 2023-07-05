import { Response, Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UsersService from '../services/user.service';
import { Users } from '../entities/User';
import { MailService } from '../services/mail.service';
import { ObjectId } from 'typeorm';

require('dotenv').config();

export class UsersController {
  constructor(private userService: UsersService, private mailService: MailService) {}

  async hashFunc(pass: string) {
    const salt = await bcrypt.genSaltSync(10);
    return bcrypt.hash(pass, salt);
  }

  async compareFunc(pass: string, hash: string) {
    return bcrypt.compare(pass, hash);
  }

  generateToken = (email: string, period = process.env.JWT_EXPIRATION) =>
    jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: period });

  verifyToken = (token: string) => jwt.verify(token, process.env.JWT_SECRET);

  async register(req: Request, res: Response) {
    const { email, password, name } = req.body.data;
    const candidate = await this.userService.getUserByEmail(email);
    if (candidate) {
      throw new Error('User have already exist');
    }
    const newUser = new Users();
    const hashPassword = await this.hashFunc(password);
    newUser.email = email;
    newUser.name = name;
    newUser.password = hashPassword;
    newUser.isActivated = false;
    newUser.activation = uuidv4();
    newUser.todos = [];
    newUser.todosCount = 0;
    const user = await this.userService.createUser(newUser);
    await this.mailService.sendActivationMessage(newUser.email, newUser.activation, user.name);
    const token = this.generateToken(user.email);
    res.json({ token, data: { email: user.email, name: user.name } });
  }

  async login(req: Request, res: Response) {
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

  async activate(req: Request, res: Response) {
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

  async changePass(req: Request, res: Response) {
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

  async requestPassReset(req: Request, res: Response) {
    const { email } = req.body.data;
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const token = this.generateToken(user.email);
    await this.mailService.sendResetMessage(email, token, user.name);
    res.json({ message: 'Reset link successfully send to your email' });
  }

  async restorePass(req: Request, res: Response) {
    const { user } = req.body;
    const { password } = req.body.data;
    const hashPassword = await this.hashFunc(password);
    user.password = hashPassword;
    await this.userService.updateUser(user);
    res.json({ message: 'Password successfully changed' });
  }

  async getUserData(req: Request, res: Response) {
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

const userController = new UsersController(new UsersService(), new MailService());

export default userController;
