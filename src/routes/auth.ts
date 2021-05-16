import { Router } from 'express';
import controller from '../controllers/auth.controller';
import validate from '../validation/register.validate';
import login from '../middlewares/login';

const router = Router();

router.post('/register', ...validate, controller.register);
router.post('/logout', controller.logout);
router.post('/login', login);

export default router;
