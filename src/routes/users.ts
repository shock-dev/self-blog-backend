import { Router } from 'express';
import controller from '../controllers/users.controller';

const router = Router();

router.get('/', controller.all);

export default router;
