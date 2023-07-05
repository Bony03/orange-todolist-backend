"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todo_service_1 = require("../../services/todo.service");
async function isExist(req, res, next) {
    try {
        const id = req.params.id;
        const todo = await todo_service_1.todoService.getOne(id);
        if (!todo) {
            throw new Error('Todo does not exist');
        }
        req.body.todo = todo;
        next();
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(404).json({ error: err.message });
        }
    }
}
exports.default = isExist;
//# sourceMappingURL=isExist.middlewere.js.map