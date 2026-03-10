// routes/orders.js
// Маршруты для работы с заказами

const express = require('express');
const router = express.Router();

// Импортируем контроллеры
const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/orders');

// Импортируем middleware
const { authenticate, validateBody } = require('../middlewares');

// Импортируем схему валидации
const { createOrderSchema, updateOrderSchema } = require('../models/order');

// ВСЕ маршруты для заказов требуют аутентификации
router.use(authenticate);

// GET /api/orders - получить все заказы (с фильтром)
router.get('/', getOrders);

// GET /api/orders/:_id - получить один заказ по id
router.get('/:_id', getOrderById);

// Для создания POST - строгая проверка (все поля обязательны)
router.post('/', validateBody(createOrderSchema), createOrder);

// Для обновления PUT - мягкая проверка (поля необязательны)
router.put('/:_id', validateBody(updateOrderSchema), updateOrder);

// DELETE /api/orders/:_id - удалить заказ
router.delete('/:_id', deleteOrder);

module.exports = router;
