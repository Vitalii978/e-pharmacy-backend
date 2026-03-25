const { Schema, model } = require('mongoose');
const Joi = require('joi');

const customerSchema = new Schema(
  {
    photo: {
      type: String,
      required: [true, 'Photo is required'],
      default: 'https://example.com/default-avatar.png',
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
    },
    spent: {
      type: String,
      required: [true, 'Spent amount is required'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
    },
    register_date: {
      type: String,
      required: [true, 'Register date is required'],
      trim: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const createCustomerSchema = Joi.object({
  photo: Joi.string().uri(),
  name: Joi.string().trim().required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required',
  }),
  email: Joi.string().trim().email().required().messages({
    'string.email': 'Please use a valid email',
    'string.empty': 'Email is required',
    'any.required': 'Email is required',
  }),
  phone: Joi.string().trim().required().messages({
    'string.empty': 'Phone is required',
    'any.required': 'Phone is required',
  }),
  spent: Joi.string().trim().required().messages({
    'string.empty': 'Spent amount is required',
    'any.required': 'Spent amount is required',
  }),
  address: Joi.string().trim().required().messages({
    'string.empty': 'Address is required',
    'any.required': 'Address is required',
  }),
  register_date: Joi.string().trim().required().messages({
    'string.empty': 'Register date is required',
    'any.required': 'Register date is required',
  }),
});

const updateCustomerSchema = Joi.object({
  photo: Joi.string().trim().uri(),
  name: Joi.string().trim(),
  email: Joi.string().trim().email(),
  phone: Joi.string().trim(),
  spent: Joi.string().trim(),
  address: Joi.string().trim(),
  register_date: Joi.string().trim(),
});

const Customer = model('customer', customerSchema);

module.exports = {
  Customer,
  createCustomerSchema,
  updateCustomerSchema,
};
