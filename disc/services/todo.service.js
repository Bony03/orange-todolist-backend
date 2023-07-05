"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoService = void 0;
const data_source_1 = require("../config/data.source");
class TodoService {
    async saveTodo(todo) {
        const data = await data_source_1.todosRepository.save(todo);
        return data;
    }
    async getOne(id) {
        const data = await data_source_1.todosRepository.find({ where: { 'user.id': id } });
        return data;
    }
    async getAll(findOptions) {
        const data = await data_source_1.todosRepository.find(findOptions);
        return data;
    }
    async getPublic() {
        const data = await data_source_1.todosRepository.find({ where: { isPrivate: false } });
        return data;
    }
    async removeOne(todo) {
        await data_source_1.todosRepository.remove(todo);
    }
}
exports.default = TodoService;
exports.todoService = new TodoService();
//# sourceMappingURL=todo.service.js.map