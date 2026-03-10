// controllers/suppliers.js
// Логика для работы с поставщиками
// Только те методы, которые есть в примере

const { Supplier } = require('../models/supplier');
const { HttpError, ctrlWrapper } = require('../utilits');

// 1. ПОЛУЧИТЬ ВСЕХ ПОСТАВЩИКОВ (с фильтром по имени)
const getAllSuppliers = async (req, res) => {
  const { query } = req.query;

  let suppliers;

  if (query) {
    suppliers = await Supplier.find({
      name: { $regex: query, $options: 'i' },
    });
  } else {
    suppliers = await Supplier.find();
  }

  res.json(suppliers);
};

// 2. ДОБАВИТЬ НОВОГО ПОСТАВЩИКА
const addSupplier = async (req, res) => {
  const { name } = req.body;

  // Проверяем, есть ли уже поставщик с таким именем
  const existingSupplier = await Supplier.findOne({ name });

  if (existingSupplier) {
    throw HttpError(400, 'Supplier with this name already exists');
  }

  // Создаем нового поставщика
  const supplier = await Supplier.create(req.body);

  res.status(201).json(supplier);
};

// 3. ОБНОВИТЬ ПОСТАВЩИКА
const editSupplier = async (req, res) => {
  const { _id } = req.params;
  const { name } = req.body;

  // Ищем поставщика по id
  const supplier = await Supplier.findById(_id);

  if (!supplier) {
    throw HttpError(404, 'Supplier not found');
  }

  // Если пытаются изменить имя, проверяем, не занято ли оно
  if (name) {
    const existingSupplier = await Supplier.findOne({ name });

    if (existingSupplier && existingSupplier._id.toString() !== _id) {
      throw HttpError(400, 'Supplier with this name already exists');
    }
  }

  // Обновляем поставщика
  const updatedSupplier = await Supplier.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  res.json(updatedSupplier);
};

// Экспортируем только те методы, что есть в примере
module.exports = {
  getAllSuppliers: ctrlWrapper(getAllSuppliers),
  addSupplier: ctrlWrapper(addSupplier),
  editSupplier: ctrlWrapper(editSupplier),
};
