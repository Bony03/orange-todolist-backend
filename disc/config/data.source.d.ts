import "reflect-metadata";
import { Users } from "../entities/User";
import { Todo } from "../entities/Todo";
export declare const userRepository: import("typeorm").MongoRepository<Users>;
export declare const todosRepository: import("typeorm").MongoRepository<Todo>;
