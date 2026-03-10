// routes/suppliers.js
// Маршруты для работы с поставщиками
// Только те, что есть в примере

const express = require('express');
const router = express.Router();

// Импортируем контроллеры
const {
  getAllSuppliers,
  addSupplier,
  editSupplier,
} = require('../controllers/suppliers');

// Импортируем middleware
const { authenticate, validateBody } = require('../middlewares');

// Импортируем схемы валидации
const { addSupplierSchema, editSupplierSchema } = require('../models/supplier');

// ВСЕ маршруты требуют аутентификации
router.use(authenticate);

// GET /api/suppliers - получить всех поставщиков (с фильтром)
router.get('/', getAllSuppliers);

// POST /api/suppliers - добавить нового поставщика
router.post('/', validateBody(addSupplierSchema), addSupplier);

// PUT /api/suppliers/:_id - обновить поставщика
router.put('/:_id', validateBody(editSupplierSchema), editSupplier);

// В примере нет DELETE и GET by id

module.exports = router;
