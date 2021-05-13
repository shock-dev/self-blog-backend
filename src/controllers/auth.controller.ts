import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { ResBody } from '../types/response';
import { IUser } from '../types/user';
import User from '../models/User';

class AuthController {
  async register(req: Request<{}, {}, IUser>, res: Response<ResBody>) {
    try {
      const { email, username, password } = req.body;
      const candidate = await User.findOne({ email });

      if (candidate) {
        console.log(candidate);

        return res.status(500).json({
          status: 'error',
          message: 'User with this email already exists'
        });
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const user = await User.create({
        email,
        username,
        password: hash
      });

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
}

export default new AuthController();
