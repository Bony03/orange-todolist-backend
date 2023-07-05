import { Column, Entity, ObjectIdColumn, ObjectId } from 'typeorm';
import { IObjectKeys } from '../types/objKeys.type';
import { Users } from './User';

@Entity()
export class Todo implements IObjectKeys {
  [key: string]: string | number | boolean | undefined | any;

  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  title: string;

  @Column()
  discription: string;

  @Column()
  isPrivate: boolean;

  @Column()
  completed: boolean;

  @Column()
  created: number;

  @Column()
  user: ObjectId;
}
