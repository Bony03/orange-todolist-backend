import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { Users } from '../../entities/User';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  return passport.authenticate('jwt', { session: false }, (err: Error, user: Users) => {
    if (!user || err instanceof Error) {
      res.status(401).json({ error: 'Authentification failed' });
      return;
    }
    req.body.user = user;
    next();
  })(req, res, next);
}
