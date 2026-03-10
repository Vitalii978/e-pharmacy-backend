// models/product.js
// Описываем, как выглядит продукт в базе данных

const { Schema, model } = require('mongoose');
const Joi = require('joi'); // добавляем Joi для валидации

// Схема продукта для MongoDB
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'], // обязательное поле
    },
    price: {
      type: String,
      required: [true, 'Product price is required'], // обязательное поле
    },
    stock: {
      type: String,
      required: [true, 'Product stock is required'], // обязательное поле
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
    versionKey: false, // убираем поле __v (служебное)
    timestamps: true, // добавляем createdAt и updatedAt автоматически
  }
);
