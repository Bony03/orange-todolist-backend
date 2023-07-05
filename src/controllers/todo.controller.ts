import { Response, Request } from 'express';
import TodoService from '../services/todo.service';
import { Todo } from '../entities/Todo';
import { ITodo } from '../types/todos.type';
import { ObjectId } from 'typeorm';
import UsersService from '../services/user.service';
import { ParsedQs } from 'qs';
import { IUser } from '../types/user.type';
import { todosRepository } from '../config/data.source';

export class TodoController {
  constructor(private todoService: TodoService, private userService: UsersService) {}

  async getAllTodo(req: Request, res: Response) {
    // eslint-disable-next-line prefer-destructuring
    const user: IUser = req.body.user;
    // eslint-disable-next-line prefer-const
    let { perPage, page, isPrivate, completed } = req.query;
    let realPage;
    let realTake;
    if (perPage) {
      realTake = +perPage;
    } else {
      perPage = '10';
      realTake = 10;
    }
    if (page) realPage = +page === 1 ? 0 : (+page - 1) * realTake;
    else {
      realPage = 0;
      page = '1';
    }
    const q = <{ isPrivate: boolean; completed: boolean }>{};
    function queryHandler(
      isPrivate: string | ParsedQs | string[] | ParsedQs[] | undefined,
      completed: string | ParsedQs | string[] | ParsedQs[] | undefined
    ) {
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
      where: { ...q, user: user.id }
    };
    const todos = await this.todoService.getAll(findOptions);

    res.status(200).json({
      todos,
      perPage: realTake,
      page: +page || 1,
      count: user.todosCount
    });
  }

  async getAllPublic(req: Request, res: Response) {
    const todos = await this.todoService.getPublic();
    res.send(todos);
  }

  async addTodo(req: Request, res: Response) {
    const { user } = req.body;
    const todo: ITodo = new Todo();
    const { data } = req.body;
    for (const i in data) {
      if (todo.hasOwnProperty.call(data, i)) {
        todo[i as keyof ITodo] = data[i];
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

  async getTodo(req: Request, res: Response) {
    const { id } = req.params;
    const todo = await this.todoService.getOne(id);
    res.send(todo);
  }

  async updateTodo(req: Request, res: Response) {
    const { todo, data } = req.body;
    for (const i in data) {
      if (todo.hasOwnProperty.call(data, i)) {
        todo[i] = data[i];
      }
    }
    const newTodo = await this.todoService.saveTodo(todo);
    res.send(newTodo);
  }

  async deleteTodo(req: Request, res: Response) {
    const { todo } = req.body;
    const { user } = req.body;
    await this.todoService.removeOne(todo);
    user.todosCount = user.todosCount - 1;
    user.todos = user.todos.filter((item: ObjectId) => item !== todo.id);
    res.send('todo successfully removed');
  }
}

const todoController = new TodoController(new TodoService(), new UsersService());

export default todoController;
