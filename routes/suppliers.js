const express = require('express');
const router = express.Router();

const {
  getAllSuppliers,
  addSupplier,
  editSupplier,
} = require('../controllers/suppliers');

const { authenticate, validateBody } = require('../middlewares');

const { addSupplierSchema, editSupplierSchema } = require('../models/supplier');

router.use(authenticate);

router.get('/', getAllSuppliers);

router.post('/', validateBody(addSupplierSchema), addSupplier);

router.put('/:_id', validateBody(editSupplierSchema), editSupplier);

module.exports = router;
