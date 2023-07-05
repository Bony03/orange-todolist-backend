import { ObjectId } from 'typeorm';
import { IObjectKeys } from './objKeys.type';

export interface IInitialUser extends IObjectKeys {
  email: string;
  password: string;
  name: string;
  activation: string;
  isActivated: boolean;
}

export interface IUser {
  email: string;
  name: string;
  isActivated: boolean;
  id: ObjectId;
  password: string;
  todos: ObjectId[];
  todosCount: number;
  activation: string;
}
