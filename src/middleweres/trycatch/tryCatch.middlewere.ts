import { Request, Response, NextFunction } from 'express';

type Controller = (req: Request, res: Response) => Promise<void>;

export default function tryCatch(controller: Controller) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res);
    } catch (err) {
      next(err);
    }
  };
}
