import { Request, Response, NextFunction } from 'express';
import { todoService } from '../../services/todo.service';

export default async function isExist(req: Request, res: Response, next: NextFunction) {
  try {
    // eslint-disable-next-line prefer-destructuring
    const id: string = req.params.id;
    const todo = await todoService.getOne(id);
    if (!todo) {
      throw new Error('Todo does not exist');
    }
    req.body.todo = todo;
    next();
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ error: err.message });
    }
  }
}
