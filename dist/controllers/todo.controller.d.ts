import { Response, Request } from 'express';
import TodoService from '../services/todo.service';
import UsersService from '../services/user.service';
export declare class TodoController {
    private todoService;
    private userService;
    constructor(todoService: TodoService, userService: UsersService);
    getAllTodo(req: Request, res: Response): Promise<void>;
    getAllPublic(req: Request, res: Response): Promise<void>;
    addTodo(req: Request, res: Response): Promise<void>;
    getTodo(req: Request, res: Response): Promise<void>;
    updateTodo(req: Request, res: Response): Promise<void>;
    deleteTodo(req: Request, res: Response): Promise<void>;
}
declare const todoController: TodoController;
export default todoController;
