import { Router } from 'express';
import controller from '../controllers/auth.controller';
import validate from '../validation/register.validate';
import passport from '../core/passport';

const router = Router();

router.post('/register', ...validate, controller.register);
router.get('/me', passport.authenticate('jwt', { session: false }), controller.getMe);
router.post('/login', controller.login);
router.post('/logout', controller.logout);

export default router;
