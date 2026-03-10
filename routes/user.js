// const express = require('express');
// const router = express.Router();

// const { register, login } = require('../controllers/auth');
// const { validateBody } = require('../middlewares');
// const { registerSchema, loginSchema } = require('../models/User');

// router.post('/register', validateBody(registerSchema), register);
// router.post('/login', validateBody(loginSchema), login);

// module.exports = router;

// routes/user.js
// Определяем маршруты (адреса) для работы с пользователями

const express = require('express');
const router = express.Router();

// Импортируем контроллеры (функции с логикой)
const { register, login, getUserInfo, logout } = require('../controllers/auth');

// Импортируем middleware (проверки)
const { validateBody, authenticate } = require('../middlewares');

// Импортируем схемы валидации из модели
const { registerSchema, loginSchema } = require('../models/User');

// ----- ПУБЛИЧНЫЕ МАРШРУТЫ (не требуют токена) -----

// POST /api/user/register - регистрация
// validateBody проверяет данные, register создает пользователя
router.post('/register', validateBody(registerSchema), register);

// POST /api/user/login - вход
// validateBody проверяет данные, login выдает токен
router.post('/login', validateBody(loginSchema), login);

// ----- ПРИВАТНЫЕ МАРШРУТЫ (требуют токен) -----

// GET /api/user/user-info - информация о пользователе
// authenticate проверяет токен, getUserInfo отдает данные
router.get('/user-info', authenticate, getUserInfo);

// GET /api/user/logout - выход
// authenticate проверяет токен, logout удаляет токен из базы
router.get('/logout', authenticate, logout);

module.exports = router;
