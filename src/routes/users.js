const { Router } = require('express');
const controller = require('../controllers/users.controller');
const checkJWT = require('../middlewares/checkJWT');
const upload = require('../core/upload');
const updateUserValidation = require('../validation/updateUser.validate');

const router = Router();

router.get('/', controller.all);

router.get('/latest', controller.getLatestUsers);

router.get('/:id', controller.one);

router.get('/:id/followers', controller.followersById);

router.get('/:id/following', controller.followingById);

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

module.exports = router;
