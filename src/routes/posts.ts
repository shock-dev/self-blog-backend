import { Router } from 'express';
import controller from '../controllers/posts.controller';
import validate from '../validation/post.validate';
import upload from '../core/upload';
import checkJWT from '../middlewares/checkJWT';

const router = Router();

router.get('/', controller.all);
router.get('/:id', controller.one);
router.post(
  '/',
  upload.single('intro'),
  checkJWT(),
  ...validate,
  controller.create
);
router.put('/:id', ...validate, controller.update);
router.delete('/:id', controller.destroy);

export default router;
