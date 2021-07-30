const Post = require('../models/Post');
const User = require('../models/User');

const findByWords = (q) => new RegExp(q, 'i');

class SearchController {
  async search(req, res) {
    try {
      const { q } = req.query;

      if (typeof q !== 'string' || q.length === 0) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid query'
        });
      }

      const posts = await Post
        .find({ title: findByWords(q) })
        .sort({ createdAt: -1 })
        .limit(5);

      const users = await User
        .find({
          $or: [
            { name: findByWords(q) },
            { surname: findByWords(q) },
            { username: findByWords(q) }
          ]
        })
        .sort({ createdAt: -1 })
        .limit(5);

      res.json({
        status: 'ok',
        posts,
        users
      });
    } catch (e) {
      res.status(500).json({
        status: 'error',
        data: e
      });
    }
  }
}

module.exports = new SearchController();
