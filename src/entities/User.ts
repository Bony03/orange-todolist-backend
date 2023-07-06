import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class Users {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  activation: string;

  @Column()
  isActivated: boolean;

  @Column()
  todos: ObjectId[];

  @Column()
  todosCount: number;
}
