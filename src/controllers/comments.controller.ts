import { Request, Response } from 'express';
import { ResBody } from '../types/response';
import Comment from '../models/Comment';
import { ICommentDocument } from '../types/comment';
import { Express } from '../global';
import Post from '../models/Post';
import { IPost } from '../types/post';

type TypeParams = {
  id: string
}

class CommentsController {
  async create(req: Request<TypeParams, {}, ICommentDocument>, res: Response<ResBody>) {
    try {
      const user: Express.User = req.user;
      const postId = req.params.id;

      let comment: ICommentDocument = await Comment.create({
        text: req.body.text,
        post: postId,
        user: user._id
      });

      comment = await comment.populate('user').execPopulate();

      const post: IPost = await Post.findById(postId);

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

export default new CommentsController();
