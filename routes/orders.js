const express = require('express');
const router = express.Router();

const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/orders');

const { authenticate, validateBody } = require('../middlewares');

const { createOrderSchema, updateOrderSchema } = require('../models/order');

router.use(authenticate);

router.get('/', getOrders);

router.get('/:_id', getOrderById);

router.post('/', validateBody(createOrderSchema), createOrder);

router.put('/:_id', validateBody(updateOrderSchema), updateOrder);

router.delete('/:_id', deleteOrder);

module.exports = router;
