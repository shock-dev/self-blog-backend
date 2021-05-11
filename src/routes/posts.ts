import { Router } from 'express';
import controller from '../controllers/posts.controller';

const router = Router();

router.get('/', controller.all);
router.get('/:id', controller.one);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

export default router;
