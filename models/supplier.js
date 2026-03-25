const { Schema, model } = require('mongoose');
const Joi = require('joi');

const supplierSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Supplier name is required'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
    },
    suppliers: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    date: {
      type: String,
      required: [true, 'Delivery date is required'],
      trim: true,
    },
    amount: {
      type: String,
      required: [true, 'Amount is required'],
      trim: true,
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

const addSupplierSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'Supplier name is required',
    'any.required': 'Supplier name is required',
  }),
  address: Joi.string().trim().required().messages({
    'string.empty': 'Address is required',
    'any.required': 'Address is required',
  }),
  suppliers: Joi.string().trim().required().messages({
    'string.empty': 'Company name is required',
    'any.required': 'Company name is required',
  }),
  date: Joi.string().trim().required().messages({
    'string.empty': 'Delivery date is required',
    'any.required': 'Delivery date is required',
  }),
  amount: Joi.string().trim().required().messages({
    'string.empty': 'Amount is required',
    'any.required': 'Amount is required',
  }),
  status: Joi.string().valid('Active', 'Deactive').default('Active'),
});

const editSupplierSchema = Joi.object({
  name: Joi.string().trim(),
  address: Joi.string().trim(),
  suppliers: Joi.string().trim(),
  date: Joi.string().trim(),
  amount: Joi.string().trim(),
  status: Joi.string().valid('Active', 'Deactive'),
});

const Supplier = model('supplier', supplierSchema);

module.exports = {
  Supplier,
  addSupplierSchema,
  editSupplierSchema,
};
