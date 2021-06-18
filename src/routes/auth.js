const { Router } = require('express');
const controller = require('../controllers/auth.controller');
const validate = require('../validation/register.validate');
const checkJWT = require('../middlewares/checkJWT');

const router = Router();

router.post('/register', ...validate, controller.register);
router.get('/me', checkJWT(), controller.getMe);
router.post('/login', controller.login);
router.post('/logout', controller.logout);

module.exports = router;
