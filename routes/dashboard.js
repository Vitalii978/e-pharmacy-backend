// routes/api/dashboard.js
// Маршрут для получения статистики

const express = require('express');
const router = express.Router();

const { getDashboardInfo } = require('../controllers/dashboard');
const { authenticate } = require('../middlewares');

// Все запросы к dashboard требуют аутентификации
router.use(authenticate);

// GET /api/dashboard - получить всю статистику
router.get('/', getDashboardInfo);

module.exports = router;
