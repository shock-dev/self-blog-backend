import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Post from '../models/Post';
import { IPost } from '../types/post';
import { ResBody } from '../types/response';
import cloudinary from '../core/cloudinary';

class PostsController {
  async all(req: Request, res: Response<ResBody>) {
    try {
      const posts = await Post.find().populate('user');
      res.json({
        status: 'ok',
        data: posts
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
      const post: IPost = await Post.findById(id).populate('user');

      post.views++;
      await post.save();

      res.json({
        status: 'ok',
        data: post
      });
    } catch (e) {
      res.status(500).json({
        status: 'error',
        data: e
      });
    }
  }

  async create(req: Request<{}, {}, IPost>, res: Response<ResBody>) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 'error',
          data: errors.array()
        });
      }

      const user: any = req.user;
      const data = {
        ...req.body,
        user: user._id
      };

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'posts'
        });

        data.imageUrl = result.secure_url;
        data.cloudinaryId = result.public_id;
      }

      const post: IPost = await Post.create(data);

      res.json({
        status: 'ok',
        data: post
      });
    } catch (e) {
      res.status(500).json({
        status: 'error',
        data: e
      });
    }
  }

  async update(req: Request<any, {}, IPost>, res: Response<ResBody>) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 'error',
          data: errors.array()
        });
      }

      const { id } = req.params;
      const data = req.body;
      const post = await Post.findByIdAndUpdate(id, data, { 'new': true });
      res.json({
        status: 'ok',
        data: post
      });
    } catch (e) {
      res.status(500).json({
        status: 'error',
        data: e
      });
    }
  }

  async destroy(req: Request, res: Response<ResBody>) {
    try {
      const { id } = req.params;
      const post = await Post.findByIdAndDelete(id);
      res.json({
        status: 'ok',
        data: post
      });
    } catch (e) {
      res.status(500).json({
        status: 'error',
        data: e
      });
    }
  }
}

export default new PostsController();
