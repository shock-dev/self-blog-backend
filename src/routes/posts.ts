import { Router } from 'express';
import PostController from '../controllers/posts.controller';
import CommentsController from '../controllers/comments.controller';
import validatePost from '../validation/post.validate';
import upload from '../core/upload';
import checkJWT from '../middlewares/checkJWT';

const router = Router();

// Post CRUD
router.get('/', PostController.all);
router.get('/:id', PostController.one);
router.post(
  '/',
  upload.single('intro'),
  checkJWT(),
  ...validatePost,
  PostController.create
);
router.put('/:id', ...validatePost, PostController.update);
router.delete('/:id', PostController.destroy);

// Comments
router.post(
  '/:id/comment',
  checkJWT(),
  CommentsController.create
);

export default router;
