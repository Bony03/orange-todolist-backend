import { Router } from 'express';
import todoController from '../../controllers/todo.controller';
import bodyValidation from '../../middleweres/validation/bodyValidation';
import tryCatch from '../../middleweres/trycatch/tryCatch.middlewere';
import isExist from '../../middleweres/isExistId/isExist.middlewere';
import { authenticate } from '../../middleweres/authPassport/authPassport';

const todosRouter: Router = Router();

// @route   GET api/todos/
// @desc    Checking access token, return a list of all todos or filtered by query request list.
// @access  Private
todosRouter.get('/', authenticate, tryCatch(todoController.getAllTodo.bind(todoController)));
// @route   GET api/todos/public
// @desc    Return a list of all public todos list.
// @access  Public
todosRouter.get('/public', tryCatch(todoController.getAllPublic.bind(todoController)));
// @route   GET api/todos/"id"
// @desc    Returns an element of the list, all it fields by specified id in param.
// @access  Private
todosRouter.get(
  '/:id',
  isExist,
  authenticate,
  tryCatch(todoController.getTodo.bind(todoController))
);
// @route   POST api/todos/
// @desc    Adds an item to the list and returns a saved with id. Also saved id in user todos field. Returns new item.
// @access  Private
todosRouter.post(
  '',
  bodyValidation,
  authenticate,
  tryCatch(todoController.addTodo.bind(todoController))
);
// @route   PUT api/todos/"id"
// @desc    Update an item by specified id in parameter and saves the new data. Returns updated item.
// @access  Private
todosRouter.put(
  '/:id',
  bodyValidation,
  isExist,
  authenticate,
  tryCatch(todoController.updateTodo.bind(todoController))
);
// @route   DELETE api/todos/"id"
// @desc    Delete an item by specified id in parameter. Returns message.
// @access  Private
todosRouter.delete('/:id', authenticate, isExist, todoController.deleteTodo.bind(todoController));

export default todosRouter;
