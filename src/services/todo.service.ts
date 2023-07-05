import { Todo } from '../entities/Todo';
import { todosRepository } from '../config/data.source';
import { IQuery, ITodo } from '../types/todos.type';

export default class TodoService {
  async saveTodo(todo: ITodo) {
    const data = await todosRepository.save(todo);
    return data;
  }

  async getOne(id: string) {
    const data = await todosRepository.find({ where: { 'user.id': id } });
    return data;
  }

  async getAll(findOptions: IQuery) {
    const data = await todosRepository.find(findOptions);
    return data;
  }

  async getPublic() {
    const data = await todosRepository.find({ where: { isPrivate: false } });
    return data;
  }

  async removeOne(todo: Todo) {
    await todosRepository.remove(todo);
  }
}

export const todoService: TodoService = new TodoService();
