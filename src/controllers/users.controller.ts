import { Request, Response } from 'express';
import { ResBody } from '../types/response';
import User from '../models/User';
import { Express } from '../global';
import cloudinary from '../core/cloudinary';
import { validationResult } from 'express-validator';

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

  async uploadAvatar(req: Request, res: Response<ResBody>) {
    try {
      const user = await User.findById((req.user as Express.User)._id);

      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'User not found'
        });
      }

      if (user.avatarUrl || user.cloudinaryId) {
        await cloudinary.uploader.destroy(user.cloudinaryId);
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'avatars',
        transformation: { width: 500, format: 'jpg' }
      });

      user.avatarUrl = result.secure_url;
      user.cloudinaryId = result.public_id;

      await user.save();

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

  async update(req: Request, res: Response<ResBody>) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 'error',
          data: errors.array()
        });
      }

      const {
        email,
        username,
        fullname
      } = req.body;

      const user = await User.findById((req.user as Express.User)._id);

      if (user.email !== email) {
        const suitableUser = await User.findOne({ email });

        if (suitableUser?.email === email) {
          return res.status(500).json({
            status: 'error',
            message: 'Пользователь с таким email уже существует'
          });
        }
      }

      if (user.username !== username) {
        const suitableUser = await User.findOne({ username });

        if (suitableUser?.username === username) {
          return res.status(500).json({
            status: 'error',
            message: 'Придумайте другой username'
          });
        }
      }

      const updatedUser = await User.findByIdAndUpdate((req.user as Express.User)._id, {
        $set: { email, username, fullname }
      }, { new: true });

      res.json({
        status: 'ok',
        data: updatedUser
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
