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

      const suitableUser = await User.findOne({ $or: [{ email }, { username }] });

      if (suitableUser?.email === email) {
        return res.status(500).json({
          status: 'error',
          message: 'Пользователь с таким email уже существует'
        });
      }

      if (suitableUser?.username === username) {
        return res.status(500).json({
          status: 'error',
          message: 'Придумайте другой username'
        });
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const user: IUser = await User.create({
        ...req.body,
        password: hash
      });

      const token = generateJWT(user);

      res.cookie(
        'authToken',
        token,
        { maxAge: 30 * 24 * 60 * 60 * 1000 }
      );

      res.json({
        status: 'ok',
        data: user
      });
    } catch (e) {
      res.status(500).json({
        status: 'error',
        message: e.message
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
          data: 'Неверный email или пароль'
        });
      }

      const isValidPassword = bcrypt.compareSync(password, user.password);

      if (!isValidPassword) {
        return res.status(400).json({
          status: 'error',
          data: 'Неверный email или пароль'
        });
      }

      const token = generateJWT(user);

      res.cookie(
        'authToken',
        token,
        { maxAge: 30 * 24 * 60 * 60 * 1000 }
      );

      res.json({
        status: 'ok',
        data: user
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

  getMe(req: Request, res: Response<ResBody>) {
    const user: any = req.user;

    res.json({
      status: 'ok',
      data: user
    });
  }
}

export default new AuthController();
