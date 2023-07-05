import { Users } from '../entities/User';
export default class UsersService {
    getUserByEmail(email: string): Promise<Users | null>;
    getUserById(id: string): Promise<Users | null>;
    getUserByAct(activation: string): Promise<Users | null>;
    createUser(userData: Users): Promise<Users>;
    updateUser(userData: Users): Promise<Users>;
}
export declare const userService: UsersService;
