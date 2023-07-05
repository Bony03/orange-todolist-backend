import { Request, Response, NextFunction } from 'express';
type Controller = (req: Request, res: Response) => Promise<void>;
export default function tryCatch(controller: Controller): (req: Request, res: Response, next: NextFunction) => Promise<void>;
export {};
