const { Types } = require('mongoose');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const cloudinary = require('../core/cloudinary');

class UsersController {
  async all(req, res) {
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

  async one(req, res) {
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

  async uploadAvatar(req, res) {
    try {
      const user = await User.findById(req.user._id);

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

  async update(req, res) {
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
        fullname,
        bio,
        location
      } = req.body;

      const user = await User.findById(req.user._id);

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

      const updatedUser = await User.findByIdAndUpdate(req.user._id, {
        $set: { email, username, fullname, location, bio }
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

  async follow(req, res) {
    try {
      const me = req.user;
      const id = new Types.ObjectId(req.params.id);

      if (!Types.ObjectId.isValid(id)) {
        return res.status(404).json({
          status: 'error',
          message: 'Invalid id'
        });
      }

      if (id.equals(me._id)) {
        return res.status(400).json({
          status: 'error',
          message: 'You cannot follow yourself'
        });
      }

      const query = {
        _id: me._id,
        following: { $not: { $elemMatch: { $eq: id } } }
      };

      const update = {
        $addToSet: { following: id.toString() }
      };

      const updated = await User.updateOne(query, update);

      const secondQuery = {
        _id: id.toString(),
        followers: { $not: { $elemMatch: { $eq: me._id } } }
      };

      const secondUpdate = {
        $addToSet: { followers: me._id }
      };

      const secondUpdated = await User.updateOne(secondQuery, secondUpdate);

      if (!updated || !secondUpdated) {
        return res.status(404).json({
          status: 'error',
          message: 'Unable to follow that user'
        });
      }

      res.json({ status: 'ok' });
    } catch (e) {
      res.status(500).json({
        status: 'error',
        data: e
      });
    }
  }

  async unfollow(req, res) {
    try {
      const me = req.user;
      const id = new Types.ObjectId(req.params.id);

      if (!Types.ObjectId.isValid(id)) {
        return res.status(404).json({
          status: 'error',
          message: 'Invalid id'
        });
      }

      if (id.equals(me._id)) {
        return res.status(400).json({
          status: 'error',
          message: 'You cannot unfollow yourself'
        });
      }

      const query = {
        _id: me._id,
        following: { $elemMatch: { $eq: id } }
      };

      const update = {
        $pull: { following: id }
      };

      const updated = await User.updateOne(query, update);

      const secondQuery = {
        _id: id.toString(),
        followers: { $elemMatch: { $eq: me._id } }
      };

      const secondUpdate = {
        $pull: { followers: me._id }
      };

      const secondUpdated = await User.updateOne(secondQuery, secondUpdate);

      if (!updated || !secondUpdated) {
        return res.status(404).json({
          status: 'error',
          message: 'Unable to unfollow that user'
        });
      }

      res.status(200).json({
        status: 'ok'
      });
    } catch (e) {
      res.status(500).json({
        status: 'error',
        data: e
      });
    }
  }

  async followersById(req, res) {
    try {
      const id = new Types.ObjectId(req.params.id);

      if (!Types.ObjectId.isValid(id)) {
        return res.status(404).json({
          status: 'error',
          message: 'Invalid id'
        });
      }

      const user = await User.findById(id).populate('followers');

      res.json({
        status: 'ok',
        data: user.followers.reverse()
      });
    } catch (e) {
      res.status(500).json({
        status: 'error',
        data: e
      });
    }
  }

  async followingById(req, res) {
    try {
      const id = new Types.ObjectId(req.params.id);

      if (!Types.ObjectId.isValid(id)) {
        return res.status(404).json({
          status: 'error',
          message: 'Invalid id'
        });
      }

      const user = await User.findById(id).populate('following');

      res.json({
        status: 'ok',
        data: user.following.reverse()
      });
    } catch (e) {
      res.status(500).json({
        status: 'error',
        data: e
      });
    }
  }

  async getLatestUsers(req, res) {
    try {
      const limit = +req.query.limit;

      if (isNaN(limit)) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid query param'
        });
      }

      const latest = await User.find().sort({ createdAt: -1 }).limit(limit);
      res.json({
        status: 'ok',
        data: latest
      });
    } catch (e) {
      res.status(500).json({
        status: 'error',
        data: e
      });
    }
  }
}

module.exports = new UsersController();
