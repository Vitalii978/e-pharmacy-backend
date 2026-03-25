const { Order } = require('../models/order');
const { HttpError, ctrlWrapper } = require('../utilits');

const getOrders = async (req, res) => {
  const { query } = req.query;

  let orders;

  if (query) {
    orders = await Order.find({
      name: { $regex: query, $options: 'i' },
    });
  } else {
    orders = await Order.find();
  }

  res.json(orders);
};

const getOrderById = async (req, res) => {
  const { _id } = req.params;

  const order = await Order.findById(_id);

  if (!order) {
    throw HttpError(404, 'Order not found');
  }

  res.json(order);
};

const createOrder = async (req, res) => {
  const order = await Order.create(req.body);

  res.status(201).json(order);
};

const updateOrder = async (req, res) => {
  const { _id } = req.params;

  const updatedOrder = await Order.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  if (!updatedOrder) {
    throw HttpError(404, 'Order not found');
  }

  res.json(updatedOrder);
};

const deleteOrder = async (req, res) => {
  const { _id } = req.params;

  const deletedOrder = await Order.findByIdAndDelete(_id);

  if (!deletedOrder) {
    throw HttpError(404, 'Order not found');
  }

  res.json({ message: 'Order deleted successfully' });
};

module.exports = {
  getOrders: ctrlWrapper(getOrders),
  getOrderById: ctrlWrapper(getOrderById),
  createOrder: ctrlWrapper(createOrder),
  updateOrder: ctrlWrapper(updateOrder),
  deleteOrder: ctrlWrapper(deleteOrder),
};
