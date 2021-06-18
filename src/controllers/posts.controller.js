const { validationResult } = require('express-validator');
const Post = require('../models/Post');
const cloudinary = require('../core/cloudinary');
const { Types } = require('mongoose');

class PostsController {
  async all(req, res) {
    try {
      const posts = await Post.find().populate('user');
      res.json({
        status: 'ok',
        data: posts.reverse()
      });
    } catch (e) {
      res.status(500).json({
        status: 'error',
        data: e
      });
    }
  }

  async one(req, res) {
    try {
      const { id } = req.params;
      const post = await Post.findById(id)
        .populate('user')
        .populate({
          path: 'comments',
          populate: { path: 'user' }
        });

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

  async create(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 'error',
          data: errors.array()
        });
      }

      const user = req.user;
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

  async update(req, res) {
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

  async destroy(req, res) {
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

  async postsByUserId(req, res) {
    try {
      const id = new Types.ObjectId(req.params.id);

      if (!Types.ObjectId.isValid(id)) {
        return res.status(404).json({
          status: 'error',
          message: 'Invalid id'
        });
      }

      const posts = await Post.find({ user: id.toString() });

      res.json({
        status: 'ok',
        data: posts.reverse()
      });
    } catch (e) {
      res.status(500).json({
        status: 'error',
        data: e
      });
    }
  }
}

module.exports = new PostsController();
