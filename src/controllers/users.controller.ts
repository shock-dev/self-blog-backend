import { Request, Response } from 'express';
import { ResBody } from '../types/response';
import User from '../models/User';

class UsersController {
  async all(req: Request, res: Response<ResBody>) {
    try {
      const users = await User.find();
      res.json({
        status: 'ok',
        data: users
      });
    } catch (e) {
      res.status(500).json({
        status: 'error',
        data: e
      });
    }
  }
}

export default new UsersController();
