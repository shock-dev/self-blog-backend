import { Router } from 'express';
import controller from '../controllers/users.controller';
import authenticate from '../middlewares/authenticate';

const router = Router();

router.get('/', controller.all);
router.get('/me', authenticate, controller.getMe);
router.get('/:id', controller.one);

export default router;
