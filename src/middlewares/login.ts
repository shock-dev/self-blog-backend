import { NextFunction, Request, Response } from 'express';
import passport from '../core/passport';
import generateJWT from '../utils/generateJWT';

const login = (req: Request, res: Response, next: NextFunction) => {
  return passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(400).json({
        status: 'error',
        data: err.message
      });
    }

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: info.message
      });
    }

    const token = generateJWT(user);

    res.json({
      status: 'ok',
      data: token
    });

    next();
  })(req, res);
};

export default login;
