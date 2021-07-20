const { Router } = require('express');
const PostController = require('../controllers/posts.controller');
const CommentsController = require('../controllers/comments.controller');
const validatePost = require('../validation/post.validate');
const upload = require('../core/upload');
const checkJWT = require('../middlewares/checkJWT');

const router = Router();

// Post CRUD
router.get('/', PostController.all);

router.get('/:id', PostController.one);

router.get('/:id/user', PostController.postsByUserId);

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

module.exports = router;
