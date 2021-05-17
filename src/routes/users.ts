import { Router } from 'express';
import controller from '../controllers/users.controller';
import passport from '../core/passport';

const router = Router();

router.get('/', controller.all);
router.get('/me', passport.authenticate('jwt', { session: false }), controller.getMe);
router.get('/:id', controller.one);

export default router;
