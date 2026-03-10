// routes/products.js
// Маршруты для работы с продуктами
// Все маршруты защищены - требуют токен авторизации

const express = require('express');
const router = express.Router();

// Импортируем контроллеры (логику) из controllers/products.js
const {
  getAllProducts, // получить все продукты
  addProduct, // добавить новый продукт
  updateProduct, // обновить продукт
  deleteProduct, // удалить продукт
} = require('../controllers/products');

// Импортируем middleware для проверки токена и валидации
const { authenticate, validateBody } = require('../middlewares');

// Импортируем схемы валидации из модели продукта
// Это правила, по которым проверяем данные перед сохранением
const { addProductSchema, editProductSchema } = require('../models/product');

// ВСЕ маршруты для продуктов требуют аутентификации
// Поэтому authenticate применяется ко всем запросам в этом роутере
// Это значит, что сначала будет проверяться токен, и только потом выполняться контроллер
router.use(authenticate);

// ----- МАРШРУТЫ -----

// 1. GET /products - получить все продукты
// Можно добавить фильтр по названию: /products?query=аспирин
router.get('/', getAllProducts);

// 2. POST /products - добавить новый продукт
// validateBody проверяет, что все поля заполнены правильно
router.post('/', validateBody(addProductSchema), addProduct);

// 3. PUT /products/:_id - обновить продукт по ID
// :_id - это параметр маршрута, реальный ID продукта
// validateBody с editProductSchema - при обновлении можно отправить не все поля
router.put('/:_id', validateBody(editProductSchema), updateProduct);

// 4. DELETE /products/:_id - удалить продукт по ID
router.delete('/:_id', deleteProduct);

module.exports = router;
