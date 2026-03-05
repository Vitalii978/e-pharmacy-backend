// @ts-nocheck
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // подключаем наши маршруты

const app = express();

// Middleware (всегда в начале)
app.use(cors()); // разрешаем запросы с других доменов
app.use(express.json()); // учимся читать JSON из запросов

// Говорим: все адреса, начинающиеся с /api/user, обрабатывай в userRoutes
app.use('/api/user', userRoutes);

// Базовый роут для проверки
app.get('/', (req, res) => {
  res.json({
    message: 'E-Pharmacy API is running',
    status: 'OK',
    endpoints: {
      login: 'POST /api/user/login',
      userInfo: 'GET /api/user/user-info (protected)',
      logout: 'GET /api/user/logout (protected)',
    },
  });
});

module.exports = app;
