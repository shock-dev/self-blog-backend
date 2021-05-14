import { NextFunction, Request, Response } from 'express';
import { ResBody } from '../types/response';
import passport from '../core/passport';

const login = (req: Request, res: Response<ResBody>, next: NextFunction) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(400).json({
        status: 'error',
        data: err
      });
    }

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: info.message
      });
    }

    res.json({
      status: 'ok',
      data: user
    });
  })(req, res, next);
};

export default login;
