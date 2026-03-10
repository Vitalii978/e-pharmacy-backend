// routes/api/user.js
// Здесь мы определяем маршруты (адреса) для работы с пользователями

const express = require('express');
const router = express.Router();

// Импортируем контроллеры (функции, которые мы только что создали)
const {
  register,
  login,
  getUserInfo,
  logout,
} = require('../../controllers/auth');

// Импортируем middleware (их мы создадим позже)
const { validateBody, authenticate } = require('../../middlewares');

// Импортируем схемы валидации из модели пользователя
const { registerSchema, loginSchema } = require('../../models/user');

// ----- ПУБЛИЧНЫЕ МАРШРУТЫ (не требуют токена) -----

// POST /api/user/register - регистрация нового пользователя
// Сначала validateBody проверяет данные, потом register создает пользователя
router.post('/register', validateBody(registerSchema), register);

// POST /api/user/login - вход в систему
// Проверяем данные, потом логиним
router.post('/login', validateBody(loginSchema), login);

// ----- ПРИВАТНЫЕ МАРШРУТЫ (требуют токен) -----

// GET /api/user/user-info - получить информацию о текущем пользователе
// Сначала authenticate проверяет токен, потом getUserInfo отдает данные
router.get('/user-info', authenticate, getUserInfo);

// GET /api/user/logout - выход из системы
// Проверяем токен, потом разлогиниваем
router.get('/logout', authenticate, logout);

module.exports = router;
