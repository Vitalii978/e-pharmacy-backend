// models/supplier.js
// Описываем, как выглядит поставщик в базе данных

const { Schema, model } = require('mongoose');
const Joi = require('joi');

// Схема поставщика для MongoDB
const supplierSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Supplier name is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    suppliers: {
      type: String,
      required: [true, 'Company name is required'],
      // В примере это поле называется "Company" в таблице, но в модели - suppliers
    },
    date: {
      type: String,
      required: [true, 'Delivery date is required'],
    },
    amount: {
      type: String,
      required: [true, 'Amount is required'],
    },
    status: {
      type: String,
      enum: ['Active', 'Deactive'],
      default: 'Active',
      required: [true, 'Status is required'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Схема для валидации при создании поставщика
const addSupplierSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Supplier name is required',
    'any.required': 'Supplier name is required',
  }),
  address: Joi.string().required().messages({
    'string.empty': 'Address is required',
    'any.required': 'Address is required',
  }),
  suppliers: Joi.string().required().messages({
    'string.empty': 'Company name is required',
    'any.required': 'Company name is required',
  }),
  date: Joi.string().required().messages({
    'string.empty': 'Delivery date is required',
    'any.required': 'Delivery date is required',
  }),
  amount: Joi.string().required().messages({
    'string.empty': 'Amount is required',
    'any.required': 'Amount is required',
  }),
  status: Joi.string().valid('Active', 'Deactive').default('Active'),
});

// Схема для валидации при обновлении (все поля необязательные)
const editSupplierSchema = Joi.object({
  name: Joi.string(),
  address: Joi.string(),
  suppliers: Joi.string(),
  date: Joi.string(),
  amount: Joi.string(),
  status: Joi.string().valid('Active', 'Deactive'),
});

// Создаем модель
const Supplier = model('supplier', supplierSchema);

// Экспортируем
module.exports = {
  Supplier,
  addSupplierSchema,
  editSupplierSchema,
};
