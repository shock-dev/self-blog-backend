import { Router } from 'express';
import controller from '../controllers/auth.controller';
import validate from '../validation/register.validate';

const router = Router();

router.post('/register', ...validate, controller.register);
router.post('/login', controller.login);

export default router;
