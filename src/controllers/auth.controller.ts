import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import { ResBody } from '../types/response';
import { IUser } from '../types/user';
import User from '../models/User';
import generateJWT from '../utils/generateJWT';

class AuthController {
  async register(req: Request<{}, {}, IUser>, res: Response<ResBody>) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 'error',
          data: errors.array()
        });
      }

      const { email, username, password } = req.body;
      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(500).json({
          status: 'error',
          message: 'User with this email already exists'
        });
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const user: IUser = await User.create({
        email,
        username,
        password: hash
      });

      const token = generateJWT(user);

      res.cookie(
        'authToken',
        token,
        { maxAge: 30 * 24 * 60 * 60 * 1000 }
      );

      const data = {
        id: user._id,
        username: user.username,
        email: user.email
      };

      res.json({
        status: 'ok',
        data
      });
    } catch (e) {
      res.status(500).json({
        status: 'error',
        data: e.message
      });
    }
  }

  async login(req: Request, res: Response<ResBody>) {
    try {
      const { email, password } = req.body;
      const user: IUser | null = await User.findOne({ email }).select('+password');

      if (!user) {
        return res.status(400).json({
          status: 'error',
          data: 'invalid username or password'
        });
      }

      const isValidPassword = bcrypt.compareSync(password, user.password);

      if (!isValidPassword) {
        return res.status(400).json({
          status: 'error',
          data: 'invalid username or password'
        });
      }

      const token = generateJWT(user);

      res.cookie(
        'authToken',
        token,
        { maxAge: 30 * 24 * 60 * 60 * 1000 }
      );

      const data = {
        id: user._id,
        username: user.username,
        email: user.email
      };

      res.json({
        status: 'ok',
        data
      });
    } catch (e) {
      res.status(500).json({
        status: 'error',
        data: e.message
      });
    }
  }

  logout(req: Request, res: Response<ResBody>) {
    if (!req.cookies['authToken']) {
      return res.status(400).json({
        status: 'error',
        message: 'You\'re already out'
      });
    }

    res.clearCookie('authToken');

    return res.json({
      status: 'ok',
      message: 'You have successfully logged out'
    });
  }
}

export default new AuthController();
