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

  async one(req: Request<any>, res: Response<ResBody>) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      res.json({
        status: 'ok',
        data: user
      });
    } catch (e) {
      res.status(500).json({
        status: 'error',
        data: e
      });
    }
  }

  getMe(req: Request, res: Response<ResBody>) {
    const { user } = req;
    res.json({
      status: 'ok',
      data: user
    });
  }
}

export default new UsersController();
