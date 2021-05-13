import { Router } from 'express';
import controller from '../controllers/users.controller';

const router = Router();

router.post('/register', controller.register);

export default router;
