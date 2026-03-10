// controllers/products.js
// Логика для работы с продуктами

const { Product } = require('../models/product');
const { HttpError, ctrlWrapper } = require('../utilits');

// 1. ПОЛУЧИТЬ ВСЕ ПРОДУКТЫ (с фильтром по названию)
const getAllProducts = async (req, res) => {
  // req.query - это параметры в URL после ?
  // Например: /api/products?query=aspirin
  const { query } = req.query;

  let products;

  if (query) {
    // Если есть параметр query - ищем продукты, в названии которых есть этот текст
    // $regex - регулярное выражение для поиска части текста
    // $options: 'i' - игнорировать регистр (большие/маленькие буквы)
    products = await Product.find({
      name: { $regex: query, $options: 'i' },
    });
  } else {
    // Если нет query - возвращаем все продукты
    products = await Product.find();
  }

  // Получаем список всех уникальных категорий
  // distinct возвращает массив уникальных значений поля category
  const categories = await Product.distinct('category');

  // Отправляем и продукты, и категории
  res.json({ products, categories });
};

// 2. ДОБАВИТЬ НОВЫЙ ПРОДУКТ
const addProduct = async (req, res) => {
  const { name } = req.body;

  // Проверяем, есть ли уже продукт с таким названием
  const existingProduct = await Product.findOne({ name });

  if (existingProduct) {
    // Если есть - ошибка 400 (Bad Request)
    throw HttpError(409, 'Product already exists');
  }

  // Создаем новый продукт
  // req.body содержит все поля: name, price, stock, category, suppliers
  const product = new Product(req.body); // Создаем новый продукт
  await product.save(); // Сохраняем в базу

  // Возвращаем созданный продукт
  res.status(201).json({ product });
};

// 3. ОБНОВИТЬ ПРОДУКТ
const updateProduct = async (req, res) => {
  const { _id } = req.params; // _id - ID продукта, который мы обновляем
  const { name } = req.body; // name - новое название продукта

  // Ищем продукт по id
  const product = await Product.findById(_id);

  if (!product) {
    // Если продукт не нашелся - ошибка 404 (Not Found)
    throw HttpError(404, 'Product not found');
  }

  // Если пытаются изменить название, проверяем, не занято ли оно
  if (name) {
    const existingProduct = await Product.findOne({ name });

    // Проверяем, что это не тот же самый продукт
    // existingProduct._id.toString() - превращаем id в строку для сравнения
    if (existingProduct && existingProduct._id.toString() !== _id) {
      throw HttpError(400, 'Product with this name already exists');
    }
  }

  // Обновляем продукт
  // { new: true } - вернуть обновленный документ, а не старый
  const updatedProduct = await Product.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  res.json(updatedProduct); // Возвращаем обновленный продукт
};

// 4. УДАЛИТЬ ПРОДУКТ
const deleteProduct = async (req, res) => {
  const { _id } = req.params; // _id - ID продукта, который мы удаляем
  const product = await Product.findById(_id); // Ищем продукт по id
  if (!product) {
    // Если продукт не нашелся - ошибка 404 (Not Found)
    throw HttpError(404, 'Product not found');
  }

  // Удаляем
  await Product.findByIdAndDelete(_id);
  res.json({ message: 'Product deleted' });
};

// Экспортируем все контроллеры, обернутые в ctrlWrapper
module.exports = {
  getAllProducts: ctrlWrapper(getAllProducts),
  addProduct: ctrlWrapper(addProduct),
  updateProduct: ctrlWrapper(updateProduct),
  deleteProduct: ctrlWrapper(deleteProduct),
};
