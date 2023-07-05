import { ObjectId } from "typeorm";
import { IObjectKeys } from "./objKeys.type";
export interface ITodo extends IObjectKeys {
    _id: ObjectId;
    title: string;
    discription: string;
    isPrivate: boolean;
    completed: boolean;
    created: number;
}
export interface IQuery {
    take?: number;
    skip?: number;
    where?: any;
}
