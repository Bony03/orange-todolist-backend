import { ObjectId } from 'typeorm';
export declare class Users {
    id: ObjectId;
    email: string;
    password: string;
    name: string;
    activation: string;
    isActivated: boolean;
    todos: ObjectId[];
    todosCount: number;
}
