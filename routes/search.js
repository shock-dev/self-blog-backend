const { Router } = require('express');
const controller = require('../controllers/seach.controller');

const router = Router();

router.get('/', controller.search);

module.exports = router;
