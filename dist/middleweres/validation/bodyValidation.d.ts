import { Request, Response, NextFunction } from 'express';
export default function bodyValidation(req: Request, res: Response, next: NextFunction): Promise<void>;
