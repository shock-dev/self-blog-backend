const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const generateJWT = require('../utils/generateJWT');

class AuthController {
  async register(req, res) {
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
          data: 'Пользователь с таким email уже существует'
        });
      }

      if (suitableUser?.username === username) {
        return res.status(500).json({
          status: 'error',
          data: 'Придумайте другой username'
        });
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const user = await User.create({
        ...req.body,
        password: hash
      });

      const token = generateJWT(user);

      res.json({
        status: 'ok',
        data: token
      });
    } catch (e) {
      res.status(500).json({
        status: 'error',
        data: e.message
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).select('+password');

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

      res.json({
        status: 'ok',
        data: token
      });
    } catch (e) {
      res.status(500).json({
        status: 'error',
        data: e.message
      });
    }
  }

  getMe(req, res) {
    const user = req.user;

    res.json({
      status: 'ok',
      data: user
    });
  }
}

module.exports = new AuthController();
