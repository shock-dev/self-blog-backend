import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Post, { IPost } from '../models/Post';
import { ResBody } from './types';

class PostsController {
  async all(req: Request, res: Response<ResBody>) {
    try {
      const posts = await Post.find();
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
      const post = await Post.findById(id);

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

      const data = req.body;
      const post = await Post.create(data);

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
