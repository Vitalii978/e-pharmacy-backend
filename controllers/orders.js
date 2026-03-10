// controllers/orders.js
// Логика для работы с заказами

const { Order } = require('../models/order');
const { HttpError, ctrlWrapper } = require('../utilits');

// ПОЛУЧИТЬ ВСЕ ЗАКАЗЫ (с фильтром по имени)
const getOrders = async (req, res) => {
  const { query } = req.query; // параметр фильтрации из URL

  let orders;

  if (query) {
    // Если есть параметр query - ищем заказы, где имя содержит этот текст
    // $regex - регулярное выражение
    // $options: 'i' - игнорировать регистр
    orders = await Order.find({
      name: { $regex: query, $options: 'i' },
    });
  } else {
    // Если нет query - возвращаем все заказы
    orders = await Order.find();
  }

  res.json(orders);
};

// ПОЛУЧИТЬ ОДИН ЗАКАЗ ПО ID
const getOrderById = async (req, res) => {
  const { _id } = req.params;

  const order = await Order.findById(_id);

  if (!order) {
    throw HttpError(404, 'Order not found');
  }

  res.json(order);
};

// СОЗДАТЬ НОВЫЙ ЗАКАЗ
const createOrder = async (req, res) => {
  // Проверяем, есть ли уже заказ с таким же именем и датой?
  // В реальном проекте могут быть одинаковые имена, поэтому лучше по id
  // Но для примера просто создаем

  const order = await Order.create(req.body);

  res.status(201).json(order);
};

// ОБНОВИТЬ ЗАКАЗ
const updateOrder = async (req, res) => {
  const { _id } = req.params;

  const updatedOrder = await Order.findByIdAndUpdate(
    _id,
    req.body,
    { new: true } // вернуть обновленный документ
  );

  if (!updatedOrder) {
    throw HttpError(404, 'Order not found');
  }

  res.json(updatedOrder);
};

// УДАЛИТЬ ЗАКАЗ
const deleteOrder = async (req, res) => {
  const { _id } = req.params;

  const deletedOrder = await Order.findByIdAndDelete(_id);

  if (!deletedOrder) {
    throw HttpError(404, 'Order not found');
  }

  res.json({ message: 'Order deleted successfully' });
};

// Экспортируем все контроллеры, обернутые в ctrlWrapper
module.exports = {
  getOrders: ctrlWrapper(getOrders),
  getOrderById: ctrlWrapper(getOrderById),
  createOrder: ctrlWrapper(createOrder),
  updateOrder: ctrlWrapper(updateOrder),
  deleteOrder: ctrlWrapper(deleteOrder),
};
