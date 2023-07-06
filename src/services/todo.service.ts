import { Todo } from '../entities/Todo';
import { todosRepository } from '../config/data.source';
import { IQuery, ITodo } from '../types/todos.type';
import { ObjectId } from 'mongodb';

export default class TodoService {
  async saveTodo(todo: ITodo) {
    const data = await todosRepository.save(todo);
    return data;
  }

  async updateTodo(todo: ITodo) {
    const data = await todosRepository.replaceOne(
      { _id: new ObjectId(todo._id) },
      { ...todo, _id: new ObjectId(todo._id) }
    );
    return data;
  }

  async getOne(id: string) {
    const data = await todosRepository.find({ where: { _id: new ObjectId(id) } });
    return data[0];
  }

  async getAll(findOptions: IQuery) {
    const data = await todosRepository.find(findOptions);
    return data;
  }

  async getPublic() {
    const data = await todosRepository.find({ where: { isPrivate: false } });
    return data;
  }

  async removeOne(_id: ObjectId) {
    await todosRepository.delete({ _id: _id });
  }
}

export const todoService: TodoService = new TodoService();
