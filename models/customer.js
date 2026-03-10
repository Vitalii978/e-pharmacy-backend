// models/customer.js
// Описываем, как выглядит клиент в базе данных

const { Schema, model } = require('mongoose');
const Joi = require('joi');

// Создаем схему для MongoDB
const customerSchema = new Schema(
  {
    photo: {
      type: String, // тип данных - строка (URL фото)
      required: [true, 'Photo is required'], // обязательное поле
      default: 'https://example.com/default-avatar.png', // значение по умолчанию
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true, // email должен быть уникальным (не может быть двух одинаковых)
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
    },
    spent: {
      type: String, // сколько потратил (в примере строка: "$1,234")
      required: [true, 'Spent amount is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    register_date: {
      type: String, // дата регистрации (строка: "March 10, 2024")
      required: [true, 'Register date is required'],
    },
  },
  {
    versionKey: false, // убираем служебное поле __v
    timestamps: true, // добавляем createdAt и updatedAt автоматически
  }
);

// Создаем схему для валидации (Joi)
// Она проверяет данные, которые приходят от фронтенда
// -------------------------------------------------
// СХЕМА ДЛЯ СОЗДАНИЯ (POST) - все поля обязательны
// -------------------------------------------------
const createCustomerSchema = Joi.object({
  photo: Joi.string().uri(),
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please use a valid email',
    'string.empty': 'Email is required',
    'any.required': 'Email is required',
  }),
  phone: Joi.string().required().messages({
    'string.empty': 'Phone is required',
    'any.required': 'Phone is required',
  }),
  spent: Joi.string().required().messages({
    'string.empty': 'Spent amount is required',
    'any.required': 'Spent amount is required',
  }),
  address: Joi.string().required().messages({
    'string.empty': 'Address is required',
    'any.required': 'Address is required',
  }),
  register_date: Joi.string().required().messages({
    'string.empty': 'Register date is required',
    'any.required': 'Register date is required',
  }),
});

// -------------------------------------------------
// СХЕМА ДЛЯ ОБНОВЛЕНИЯ (PUT) - все поля НЕобязательны
// -------------------------------------------------
const updateCustomerSchema = Joi.object({
  photo: Joi.string().uri(),
  name: Joi.string(), // убрали .required()
  email: Joi.string().email(), // убрали .required()
  phone: Joi.string(), // убрали .required()
  spent: Joi.string(), // убрали .required()
  address: Joi.string(), // убрали .required()
  register_date: Joi.string(), // убрали .required()
});

const Customer = model('customer', customerSchema);

module.exports = {
  Customer,
  createCustomerSchema, // для POST
  updateCustomerSchema, // для PUT
};
