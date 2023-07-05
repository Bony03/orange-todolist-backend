"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todo_controller_1 = __importDefault(require("../../controllers/todo.controller"));
const bodyValidation_1 = __importDefault(require("../../middleweres/validation/bodyValidation"));
const tryCatch_middlewere_1 = __importDefault(require("../../middleweres/trycatch/tryCatch.middlewere"));
const isExist_middlewere_1 = __importDefault(require("../../middleweres/isExistId/isExist.middlewere"));
const authPassport_1 = require("../../middleweres/authPassport/authPassport");
const todosRouter = (0, express_1.Router)();
todosRouter.get('/', authPassport_1.authenticate, (0, tryCatch_middlewere_1.default)(todo_controller_1.default.getAllTodo.bind(todo_controller_1.default)));
todosRouter.get('/public', (0, tryCatch_middlewere_1.default)(todo_controller_1.default.getAllPublic.bind(todo_controller_1.default)));
todosRouter.get('/:id', isExist_middlewere_1.default, authPassport_1.authenticate, (0, tryCatch_middlewere_1.default)(todo_controller_1.default.getTodo.bind(todo_controller_1.default)));
todosRouter.post('', bodyValidation_1.default, authPassport_1.authenticate, (0, tryCatch_middlewere_1.default)(todo_controller_1.default.addTodo.bind(todo_controller_1.default)));
todosRouter.put('/:id', bodyValidation_1.default, isExist_middlewere_1.default, authPassport_1.authenticate, (0, tryCatch_middlewere_1.default)(todo_controller_1.default.updateTodo.bind(todo_controller_1.default)));
todosRouter.delete('/:id', authPassport_1.authenticate, isExist_middlewere_1.default, todo_controller_1.default.deleteTodo.bind(todo_controller_1.default));
exports.default = todosRouter;
//# sourceMappingURL=todos.route.js.map