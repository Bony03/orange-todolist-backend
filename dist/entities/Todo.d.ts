import { ObjectId } from 'typeorm';
import { IObjectKeys } from '../types/objKeys.type';
export declare class Todo implements IObjectKeys {
    [key: string]: string | number | boolean | undefined | any;
    _id: ObjectId;
    title: string;
    discription: string;
    isPrivate: boolean;
    completed: boolean;
    created: number;
    user: ObjectId;
}
