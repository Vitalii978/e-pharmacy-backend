const { Schema, model } = require('mongoose');
const Joi = require('joi');

const orderSchema = new Schema(
  {
    photo: {
      type: String,
      required: [true, 'Photo is required'],
      default: 'https://example.com/default-avatar.png',
    },
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
    },
    products: {
      type: String,
      required: [true, 'Products are required'],
      trim: true,
    },
    price: {
      type: String,
      required: [true, 'Price is required'],
      trim: true,
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
      trim: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const createOrderSchema = Joi.object({
  photo: Joi.string().uri(),
  name: Joi.string().trim().required().messages({
    'string.empty': 'Customer name is required',
    'any.required': 'Customer name is required',
  }),
  address: Joi.string().trim().required().messages({
    'string.empty': 'Address is required',
    'any.required': 'Address is required',
  }),
  products: Joi.string().trim().required().messages({
    'string.empty': 'Products are required',
    'any.required': 'Products are required',
  }),
  price: Joi.string().trim().required().messages({
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
  order_date: Joi.string().trim().required().messages({
    'string.empty': 'Order date is required',
    'any.required': 'Order date is required',
  }),
});

const updateOrderSchema = Joi.object({
  photo: Joi.string().uri(),
  name: Joi.string().trim().messages({
    'string.empty': 'Customer name cannot be empty',
  }),
  address: Joi.string().trim().messages({
    'string.empty': 'Address cannot be empty',
  }),
  products: Joi.string().trim().messages({
    'string.empty': 'Products cannot be empty',
  }),
  price: Joi.string().trim().messages({
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

const Order = model('order', orderSchema);

module.exports = {
  Order,
  createOrderSchema,
  updateOrderSchema,
};
