import { Router } from 'express';
import controller from '../controllers/users.controller';
import checkJWT from '../middlewares/checkJWT';
import upload from '../core/upload';
import updateUserValidation from '../validation/updateUser.validate';

const router = Router();

router.get('/', controller.all);
router.get('/:id', controller.one);
router.post(
  '/avatar',
  upload.single('avatar'),
  checkJWT(),
  controller.uploadAvatar
);
router.put(
  '/',
  ...updateUserValidation,
  checkJWT(),
  controller.update
);

export default router;
