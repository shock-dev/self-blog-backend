import { Router } from 'express';
import controller from '../controllers/users.controller';
import checkJWT from '../middlewares/checkJWT';
import upload from '../core/upload';
import updateUserValidation from '../validation/updateUser.validate';

const router = Router();

router.get('/', controller.all);

router.get('/:id', controller.one);

router.get('/:id/followers', controller.followersById);

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

router.patch(
  '/:id/follow',
  checkJWT(),
  controller.follow
);

router.patch(
  '/:id/unfollow',
  checkJWT(),
  controller.unfollow
);

export default router;
