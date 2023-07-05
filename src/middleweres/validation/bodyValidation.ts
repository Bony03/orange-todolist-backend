// eslint-disable-next-line import/no-extraneous-dependencies
import Joi, { ValidationError } from 'joi';
import { Request, Response, NextFunction } from 'express';

export default async function bodyValidation(req: Request, res: Response, next: NextFunction) {
  try {
    const schema = Joi.object().min(1);
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(400).json(err.details[0].message);
    }
  }
}
