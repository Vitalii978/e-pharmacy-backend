const { Product } = require('../models/product');
const { HttpError, ctrlWrapper } = require('../utilits');

const getAllProducts = async (req, res) => {
  const { query } = req.query;

  let products;

  if (query) {
    products = await Product.find({
      name: { $regex: query, $options: 'i' },
    });
  } else {
    products = await Product.find();
  }

  const categories = await Product.distinct('category');
  res.json({ products, categories });
};

const addProduct = async (req, res) => {
  const { name } = req.body;
  const existingProduct = await Product.findOne({ name });

  if (existingProduct) {
    throw HttpError(409, 'Product already exists');
  }

  const product = new Product(req.body);
  await product.save();

  res.status(201).json({ product });
};

const updateProduct = async (req, res) => {
  const { _id } = req.params;
  const { name } = req.body;

  const product = await Product.findById(_id);

  if (!product) {
    throw HttpError(404, 'Product not found');
  }

  if (name) {
    const existingProduct = await Product.findOne({ name });

    if (existingProduct && existingProduct._id.toString() !== _id) {
      throw HttpError(400, 'Product with this name already exists');
    }
  }

  const updatedProduct = await Product.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  res.json(updatedProduct);
};

const deleteProduct = async (req, res) => {
  const { _id } = req.params;
  const product = await Product.findById(_id);
  if (!product) {
    throw HttpError(404, 'Product not found');
  }

  await Product.findByIdAndDelete(_id);
  res.json({ message: 'Product deleted' });
};

module.exports = {
  getAllProducts: ctrlWrapper(getAllProducts),
  addProduct: ctrlWrapper(addProduct),
  updateProduct: ctrlWrapper(updateProduct),
  deleteProduct: ctrlWrapper(deleteProduct),
};
