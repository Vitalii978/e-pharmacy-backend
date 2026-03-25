const { Schema, model } = require('mongoose');
const Joi = require('joi');

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    price: {
      type: String,
      required: [true, 'Price is required'],
      trim: true,
    },
    stock: {
      type: String,
      required: [true, 'Stock is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: [
        'Medicine',
        'Head',
        'Hand',
        'Dental Care',
        'Skin Care',
        'Eye Care',
        'Vitamins & Supplements',
        'Leg',
        'Baby Care',
        'Heart',
      ],
      required: [true, 'Category is required'],
    },
    suppliers: {
      type: String,
      trim: true,
      required: [true, 'Supplier is required'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const addProductSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'Product name is required',
    'any.required': 'Product name is required',
  }),
  price: Joi.string().trim().required().messages({
    'string.empty': 'Price is required',
    'any.required': 'Price is required',
  }),
  stock: Joi.string().trim().required().messages({
    'string.empty': 'Stock is required',
    'any.required': 'Stock is required',
  }),
  category: Joi.string()
    .valid(
      'Medicine',
      'Head',
      'Hand',
      'Dental Care',
      'Skin Care',
      'Eye Care',
      'Vitamins & Supplements',
      'Leg',
      'Baby Care',
      'Heart'
    )
    .required()
    .messages({
      'any.only': 'Category must be one of the allowed values',
      'any.required': 'Category is required',
    }),
  suppliers: Joi.string().trim().required().messages({
    'string.empty': 'Supplier is required',
    'any.required': 'Supplier is required',
  }),
});

const editProductSchema = Joi.object({
  name: Joi.string().trim(),
  price: Joi.string().trim(),
  stock: Joi.string().trim(),
  category: Joi.string().valid(
    'Medicine',
    'Head',
    'Hand',
    'Dental Care',
    'Skin Care',
    'Eye Care',
    'Vitamins & Supplements',
    'Leg',
    'Baby Care',
    'Heart'
  ),
  suppliers: Joi.string().trim(),
});

const Product = model('product', productSchema);

module.exports = {
  Product,
  addProductSchema,
  editProductSchema,
};
