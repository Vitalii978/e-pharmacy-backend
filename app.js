// app.js
// Настройка сервера: middleware, маршруты, обработка ошибок

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

// Импортируем маршруты
const userRouter = require('./routes/user'); // обрати внимание: user, а не api/user
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders'); // добавили

const app = express();

// Middleware (выполняются для каждого запроса)
app.use(logger('dev')); // логирует запросы в консоль
app.use(cors()); // разрешает запросы с других доменов
app.use(express.json()); // преобразует JSON из body в объект

// Подключаем маршруты (порядок важен - до 404!)
app.use('/api/user', userRouter); // все запросы на /api/user идут в userRouter
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);

// Если ни один маршрут не подошел - 404
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Обработчик ошибок (всегда последний)
app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
