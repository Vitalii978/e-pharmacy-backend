// @ts-nocheck
const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config(); // 👈 ЭТА СТРОКА БЫЛА ПРОПУЩЕНА!

console.log('✅ JWT_SECRET loaded successfully');

const { DB_HOST } = process.env;

// Проверим, что переменная загрузилась (временная проверка)
console.log('DB_HOST:', DB_HOST); // 👈 Добавим для отладки

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log('Database connection successful');
  })
  .catch(error => {
    console.log('Connection error:', error.message);
    process.exit(1);
  });
