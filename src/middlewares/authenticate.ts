import passport from 'passport';
import { NextFunction, Request, Response } from 'express';

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  return passport.authenticate('jwt', {
    session: false
  }, (err, user, info) => {
    if (!user || err) {
      return res.status(400).json({
        status: 'error',
        error: info.message
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};

export default authenticate;
