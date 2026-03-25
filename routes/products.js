const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products');

const { authenticate, validateBody } = require('../middlewares');

const { addProductSchema, editProductSchema } = require('../models/product');

router.use(authenticate);

router.get('/', getAllProducts);

router.post('/', validateBody(addProductSchema), addProduct);

router.put('/:_id', validateBody(editProductSchema), updateProduct);

router.delete('/:_id', deleteProduct);

module.exports = router;
