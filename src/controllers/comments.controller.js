const Comment = require('../models/Comment');
const Post = require('../models/Post');

class CommentsController {
  async create(req, res) {
    try {
      const user = req.user;
      const postId = req.params.id;

      let comment = await Comment.create({
        text: req.body.text,
        post: postId,
        user: user._id
      });

      comment = await comment.populate('user').execPopulate();

      const post = await Post.findById(postId);

      post.comments.push(comment.id);

      await post.save();

      res.json({
        status: 'ok',
        data: comment
      });
    } catch (e) {
      res.status(500).json({
        status: 'error',
        data: e.message
      });
    }
  }
}

module.exports = new CommentsController();
