// @ts-nocheck
const app = require('./app'); // импортируем настройки из app.js
const mongoose = require('mongoose'); // библиотека для MongoDB
require('dotenv').config(); // загружаем переменные из .env

const { DB_HOST } = process.env; // берем строку подключения к базе

// Подключаемся к MongoDB
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log('Database connection successful');
  })
  .catch(error => {
    console.log('Connection error:', error.message);
    process.exit(1); // если не подключились к базе - выходим с ошибкой
  });
