import { Request, Response } from 'express';
import { ResBody } from '../types/response';

class AuthController {
  async register(req: Request, res: Response<ResBody>) {
    try {
      res.json({
        status: 'ok'
      });
    } catch (e) {
      res.status(500).json({
        status: 'error',
        data: e
      });
    }
  }
}

export default new AuthController();
