// models/order.js
// Описываем, как выглядит заказ в базе данных

const { Schema, model } = require('mongoose');
const Joi = require('joi'); // для валидации данных

// Схема заказа для MongoDB
const orderSchema = new Schema(
  {
    photo: {
      type: String,
      required: [true, 'Photo is required'],
      default: 'https://example.com/default-avatar.png', // заглушка
    },
    name: {
      type: String,
      required: [true, 'Customer name is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    products: {
      type: String,
      required: [true, 'Products are required'],
    },
    price: {
      type: String,
      required: [true, 'Price is required'],
    },
    status: {
      type: String,
      enum: [
        'Confirmed',
        'Shipped',
        'Delivered',
        'Completed',
        'Processing',
        'Cancelled',
        'Pending',
      ],
      default: 'Pending',
      required: [true, 'Status is required'],
    },
    order_date: {
      type: String,
      required: [true, 'Order date is required'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// ------ СХЕМЫ ДЛЯ ВАЛИДАЦИИ (Joi) ------

// 1. Для создания заказа (ВСЕ поля обязательные)
const createOrderSchema = Joi.object({
  photo: Joi.string().uri(),
  name: Joi.string().required().messages({
    'string.empty': 'Customer name is required',
    'any.required': 'Customer name is required',
  }),
  address: Joi.string().required().messages({
    'string.empty': 'Address is required',
    'any.required': 'Address is required',
  }),
  products: Joi.string().required().messages({
    'string.empty': 'Products are required',
    'any.required': 'Products are required',
  }),
  price: Joi.string().required().messages({
    'string.empty': 'Price is required',
    'any.required': 'Price is required',
  }),
  status: Joi.string()
    .valid(
      'Confirmed',
      'Shipped',
      'Delivered',
      'Completed',
      'Processing',
      'Cancelled',
      'Pending'
    )
    .default('Pending'),
  order_date: Joi.string().required().messages({
    'string.empty': 'Order date is required',
    'any.required': 'Order date is required',
  }),
});

// 2. Для обновления заказа (ВСЕ поля НЕобязательные)
const updateOrderSchema = Joi.object({
  photo: Joi.string().uri(),
  name: Joi.string().messages({
    'string.empty': 'Customer name cannot be empty',
  }),
  address: Joi.string().messages({
    'string.empty': 'Address cannot be empty',
  }),
  products: Joi.string().messages({
    'string.empty': 'Products cannot be empty',
  }),
  price: Joi.string().messages({
    'string.empty': 'Price cannot be empty',
  }),
  status: Joi.string().valid(
    'Confirmed',
    'Shipped',
    'Delivered',
    'Completed',
    'Processing',
    'Cancelled',
    'Pending'
  ),
  order_date: Joi.string().messages({
    'string.empty': 'Order date cannot be empty',
  }),
});

// Создаем модель
const Order = model('order', orderSchema);

// Экспортируем модель и ОБЕ схемы
module.exports = {
  Order,
  createOrderSchema,
  updateOrderSchema,
};
