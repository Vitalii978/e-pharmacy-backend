// routes/api/customers.js
// Маршруты для работы с клиентами

const express = require('express');
const router = express.Router();

// Импортируем контроллеры
const {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require('../controllers/customers');

// Импортируем middleware
const { authenticate, validateBody } = require('../middlewares');

// Импортируем схему валидации
const {
  createCustomerSchema,
  updateCustomerSchema,
} = require('../models/customer');

// ВСЕ маршруты для клиентов требуют аутентификации
// Поэтому authenticate применяется ко всем сразу
router.use(authenticate);

// GET /api/customers - получить всех клиентов (с фильтром по ?query=)
router.get('/', getAllCustomers);

// GET /api/customers/:_id - получить одного клиента по id
router.get('/:_id', getCustomerById);

// POST /api/customers - создать нового клиента
// validateBody проверяет данные перед созданием
router.post('/', validateBody(createCustomerSchema), createCustomer);

// PUT /api/customers/:_id - обновить клиента
router.put('/:_id', validateBody(updateCustomerSchema), updateCustomer);

// DELETE /api/customers/:_id - удалить клиента
router.delete('/:_id', deleteCustomer);

module.exports = router;
