// models/product.js
// Описываем, как выглядит продукт в базе данных

const { Schema, model } = require('mongoose');
const Joi = require('joi'); // для валидации данных

// Схема продукта для MongoDB
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'], // обязательное поле
    },
    price: {
      type: String,
      required: [true, 'Price is required'],
    },
    stock: {
      type: String,
      required: [true, 'Stock is required'],
    },
    category: {
      type: String,
      enum: [
        // только эти значения можно использовать
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
      required: [true, 'Supplier is required'],
    },
  },
  {
    versionKey: false, // убираем поле __v
    timestamps: true, // добавляем createdAt и updatedAt автоматически
  }
);

// Схема для валидации при создании продукта (Joi)
const addProductSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Product name is required',
    'any.required': 'Product name is required',
  }),
  price: Joi.string().required().messages({
    'string.empty': 'Price is required',
    'any.required': 'Price is required',
  }),
  stock: Joi.string().required().messages({
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
  suppliers: Joi.string().required().messages({
    'string.empty': 'Supplier is required',
    'any.required': 'Supplier is required',
  }),
});

// Схема для валидации при обновлении (все поля необязательные)
const editProductSchema = Joi.object({
  name: Joi.string(),
  price: Joi.string(),
  stock: Joi.string(),
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
  suppliers: Joi.string(),
});

// Создаем модель
const Product = model('product', productSchema);

// Экспортируем всё вместе
module.exports = {
  Product,
  addProductSchema,
  editProductSchema,
};
