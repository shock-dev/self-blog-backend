import { Router } from 'express';
import controller from '../controllers/auth.controller';
import validate from '../validation/register.validate';
import checkJWT from '../middlewares/checkJWT';

const router = Router();

router.post('/register', ...validate, controller.register);
router.get('/me', checkJWT(), controller.getMe);
router.post('/login', controller.login);
router.post('/logout', controller.logout);

export default router;
