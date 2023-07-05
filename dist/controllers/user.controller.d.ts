import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import UsersService from '../services/user.service';
import { MailService } from '../services/mail.service';
export declare class UsersController {
    private userService;
    private mailService;
    constructor(userService: UsersService, mailService: MailService);
    hashFunc(pass: string): Promise<string>;
    compareFunc(pass: string, hash: string): Promise<boolean>;
    generateToken: (email: string, period?: string) => string;
    verifyToken: (token: string) => string | jwt.JwtPayload;
    register(req: Request, res: Response): Promise<void>;
    login(req: Request, res: Response): Promise<void>;
    activate(req: Request, res: Response): Promise<void>;
    changePass(req: Request, res: Response): Promise<void>;
    requestPassReset(req: Request, res: Response): Promise<void>;
    restorePass(req: Request, res: Response): Promise<void>;
    getUserData(req: Request, res: Response): Promise<void>;
}
declare const userController: UsersController;
export default userController;
