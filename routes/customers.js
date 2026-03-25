const express = require('express');
const router = express.Router();

const {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require('../controllers/customers');

const { authenticate, validateBody } = require('../middlewares');

const {
  createCustomerSchema,
  updateCustomerSchema,
} = require('../models/customer');

router.use(authenticate);

router.get('/', getAllCustomers);

router.get('/:_id', getCustomerById);

router.post('/', validateBody(createCustomerSchema), createCustomer);

router.put('/:_id', validateBody(updateCustomerSchema), updateCustomer);

router.delete('/:_id', deleteCustomer);

module.exports = router;
