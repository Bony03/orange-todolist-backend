import { ObjectId } from "typeorm";

export interface IObjectKeys {
  [key: string]: string | number | boolean | undefined | ObjectId;
}
