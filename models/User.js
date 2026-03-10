// // models/user.js
// // Описываем, как выглядит пользователь в базе данных

// const { Schema, model } = require('mongoose');

// // Схема пользователя - описываем поля и их типы
// const userSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: [true, 'Name is required'], // обязательное поле
//     },
//     email: {
//       type: String,
//       required: [true, 'Email is required'],
//       unique: true, // email должен быть уникальным (не может быть два одинаковых)
//       match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'], // проверка формата email
//     },
//     password: {
//       type: String,
//       required: [true, 'Password is required'],
//       minlength: 6, // минимум 6 символов
//     },
//     token: {
//       type: String,
//       default: '', // по умолчанию пустая строка (пользователь не залогинен)
//     },
//   },
//   {
//     versionKey: false, // убираем поле __v (служебное)
//     timestamps: true, // добавляем поля createdAt и updatedAt автоматически
//   }
// );

// // Создаем модель на основе схемы
// // "user" - название коллекции в базе (будет называться "users")
// const User = model('user', userSchema);

// module.exports = User;

// models/user.js
// Описываем, как выглядит пользователь в базе данных

const { Schema, model } = require('mongoose');
const Joi = require('joi'); // добавляем Joi для валидации

// Схема пользователя - описываем поля и их типы
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'], // обязательное поле
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true, // email должен быть уникальным (не может быть два одинаковых)
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'], // проверка формата email
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6, // минимум 6 символов
    },
    token: {
      type: String,
      default: '', // по умолчанию пустая строка (пользователь не залогинен)
    },
  },
  {
    versionKey: false, // убираем поле __v (служебное)
    timestamps: true, // добавляем поля createdAt и updatedAt автоматически
  }
);

// Создаем модель на основе схемы
// "user" - название коллекции в базе (будет называться "users")
const User = model('user', userSchema);

// ========== СХЕМЫ ВАЛИДАЦИИ JOI ==========

// Схема для регистрации
const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please use a valid email',
    'string.empty': 'Email is required',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'string.empty': 'Password is required',
    'any.required': 'Password is required',
  }),
});

// Схема для логина
const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please use a valid email',
    'string.empty': 'Email is required',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'string.empty': 'Password is required',
    'any.required': 'Password is required',
  }),
});

// Экспортируем всё вместе
module.exports = {
  User,
  registerSchema,
  loginSchema,
};
