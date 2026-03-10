// controllers/customers.js
// Логика для работы с клиентами

const { Customer } = require('../models/customer');
const { HttpError, ctrlWrapper } = require('../utilits');

// 1. ПОЛУЧИТЬ ВСЕХ КЛИЕНТОВ (с фильтром по имени)
const getAllCustomers = async (req, res) => {
  // req.query - это параметры в URL после ?
  // Например: /api/customers?query=john
  const { query } = req.query;

  let customers;

  if (query) {
    // Если есть параметр query - ищем клиентов, в имени которых есть этот текст
    // $regex - специальный оператор MongoDB для поиска по части текста
    // $options: 'i' - игнорировать регистр (большие/маленькие буквы)
    // То есть "john" найдет и "John", и "JOHN", и "johnson"
    customers = await Customer.find({
      name: { $regex: query, $options: 'i' },
    });
  } else {
    // Если нет query - возвращаем всех клиентов
    customers = await Customer.find();
  }

  res.json(customers);
};

// 2. ПОЛУЧИТЬ КЛИЕНТА ПО ID
const getCustomerById = async (req, res) => {
  // req.params - это параметры из URL (то, что после :)
  // Например: /api/customers/12345 -> req.params._id = "12345"
  const { _id } = req.params;

  // Ищем клиента по id
  const customer = await Customer.findById(_id);

  // Если клиент не найден - ошибка 404
  if (!customer) {
    throw HttpError(404, 'Customer not found');
  }

  res.json(customer);
};

// 3. СОЗДАТЬ НОВОГО КЛИЕНТА
const createCustomer = async (req, res) => {
  const { email } = req.body;

  // Проверяем, есть ли уже клиент с таким email
  const existingCustomer = await Customer.findOne({ email });

  if (existingCustomer) {
    // 409 - Conflict (конфликт)
    throw HttpError(409, 'Customer with this email already exists');
  }

  // Создаем нового клиента
  // req.body содержит все поля: name, email, phone, spent, address, register_date
  const customer = await Customer.create(req.body);

  // 201 - Created (создано)
  res.status(201).json(customer);
};

// 4. ОБНОВИТЬ КЛИЕНТА
const updateCustomer = async (req, res) => {
  const { _id } = req.params;
  const { email } = req.body;

  // Ищем клиента по id
  const customer = await Customer.findById(_id);

  if (!customer) {
    throw HttpError(404, 'Customer not found');
  }

  // Если пытаются изменить email, проверяем, не занят ли он
  if (email) {
    const existingCustomer = await Customer.findOne({ email });

    // Проверяем, что это не тот же самый клиент
    // existingCustomer._id.toString() - превращаем id в строку для сравнения
    if (existingCustomer && existingCustomer._id.toString() !== _id) {
      throw HttpError(409, 'Customer with this email already exists');
    }
  }

  // Обновляем клиента
  // { new: true } - вернуть обновленный документ, а не старый
  const updatedCustomer = await Customer.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  res.json(updatedCustomer);
};

// 5. УДАЛИТЬ КЛИЕНТА
const deleteCustomer = async (req, res) => {
  const { _id } = req.params;

  const deletedCustomer = await Customer.findByIdAndDelete(_id);

  if (!deletedCustomer) {
    throw HttpError(404, 'Customer not found');
  }

  res.json({ message: 'Customer deleted successfully' });
};

// Экспортируем все контроллеры, обернутые в ctrlWrapper
module.exports = {
  getAllCustomers: ctrlWrapper(getAllCustomers),
  getCustomerById: ctrlWrapper(getCustomerById),
  createCustomer: ctrlWrapper(createCustomer),
  updateCustomer: ctrlWrapper(updateCustomer),
  deleteCustomer: ctrlWrapper(deleteCustomer),
};
