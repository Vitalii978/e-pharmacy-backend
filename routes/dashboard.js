const express = require('express');
const router = express.Router();

const { getDashboardInfo } = require('../controllers/dashboard');
const { authenticate } = require('../middlewares');

router.use(authenticate);

router.get('/', getDashboardInfo);

module.exports = router;
