"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
const todo_service_1 = __importDefault(require("../services/todo.service"));
const Todo_1 = require("../entities/Todo");
const user_service_1 = __importDefault(require("../services/user.service"));
class TodoController {
    constructor(todoService, userService) {
        this.todoService = todoService;
        this.userService = userService;
    }
    async getAllTodo(req, res) {
        const user = req.body.user;
        let { perPage, page, isPrivate, completed } = req.query;
        let realPage;
        let realTake;
        if (perPage) {
            realTake = +perPage;
        }
        else {
            perPage = '10';
            realTake = 10;
        }
        if (page)
            realPage = +page === 1 ? 0 : (+page - 1) * realTake;
        else {
            realPage = 0;
            page = '1';
        }
        const q = {};
        function queryHandler(isPrivate, completed) {
            if (isPrivate) {
                q.isPrivate = isPrivate === 'true' ? true : false;
            }
            if (completed) {
                q.completed = completed === 'true' ? true : false;
            }
        }
        queryHandler(isPrivate, completed);
        const findOptions = {
            take: realTake,
            skip: realPage,
            where: Object.assign(Object.assign({}, q), { user: user.id })
        };
        const todos = await this.todoService.getAll(findOptions);
        res.status(200).json({
            todos,
            perPage: realTake,
            page: +page || 1,
            count: user.todosCount
        });
    }
    async getAllPublic(req, res) {
        const todos = await this.todoService.getPublic();
        res.send(todos);
    }
    async addTodo(req, res) {
        const { user } = req.body;
        const todo = new Todo_1.Todo();
        const { data } = req.body;
        for (const i in data) {
            if (todo.hasOwnProperty.call(data, i)) {
                todo[i] = data[i];
            }
        }
        todo.user = user.id;
        todo.created = Date.now();
        const savedTodo = await this.todoService.saveTodo(todo);
        user.todos = [...user.todos, savedTodo._id];
        user.todosCount = user.todos.length;
        await this.userService.updateUser(user);
        res.send(savedTodo);
    }
    async getTodo(req, res) {
        const { id } = req.params;
        const todo = await this.todoService.getOne(id);
        res.send(todo);
    }
    async updateTodo(req, res) {
        const { todo, data } = req.body;
        for (const i in data) {
            if (todo.hasOwnProperty.call(data, i)) {
                todo[i] = data[i];
            }
        }
        const newTodo = await this.todoService.saveTodo(todo);
        res.send(newTodo);
    }
    async deleteTodo(req, res) {
        const { todo } = req.body;
        const { user } = req.body;
        await this.todoService.removeOne(todo);
        user.todosCount = user.todosCount - 1;
        user.todos = user.todos.filter((item) => item !== todo.id);
        res.send('todo successfully removed');
    }
}
exports.TodoController = TodoController;
const todoController = new TodoController(new todo_service_1.default(), new user_service_1.default());
exports.default = todoController;
//# sourceMappingURL=todo.controller.js.map