import { Todo } from '../entities/Todo';
import { IQuery, ITodo } from '../types/todos.type';
export default class TodoService {
    saveTodo(todo: ITodo): Promise<ITodo & Todo>;
    getOne(id: string): Promise<Todo[]>;
    getAll(findOptions: IQuery): Promise<Todo[]>;
    getPublic(): Promise<Todo[]>;
    removeOne(todo: Todo): Promise<void>;
}
export declare const todoService: TodoService;
