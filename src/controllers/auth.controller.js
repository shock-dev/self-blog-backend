const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const generateJWT = require('../utils/generateJWT');

const cookieOptions = {
  maxAge: 30 * 24 * 60 * 60 * 1000,
  sameSite: 'none',
  secure: true,
  domain: 'self-blog.vercel.app'
};

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
          message: 'Пользователь с таким email уже существует'
        });
      }

      if (suitableUser?.username === username) {
        return res.status(500).json({
          status: 'error',
          message: 'Придумайте другой username'
        });
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const user = await User.create({
        ...req.body,
        password: hash
      });

      const token = generateJWT(user);

      res.cookie('authToken', token, cookieOptions);

      res.json({
        status: 'ok',
        data: user
      });
    } catch (e) {
      res.status(500).json({
        status: 'error',
        message: e.message
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

      res.cookie('authToken', token, cookieOptions);

      res.json({
        status: 'ok',
        data: user
      });
    } catch (e) {
      res.status(500).json({
        status: 'error',
        data: e.message
      });
    }
  }

  logout(req, res) {
    if (!req.cookies['authToken']) {
      return res.status(400).json({
        status: 'error',
        message: 'You\'re already out'
      });
    }

    res.clearCookie('authToken');

    return res.json({
      status: 'ok',
      message: 'You have successfully logged out'
    });
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
