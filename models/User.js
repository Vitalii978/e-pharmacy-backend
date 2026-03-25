const { Schema, model } = require('mongoose');
const Joi = require('joi');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      trim: true,
    },
    token: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = model('user', userSchema);

const registerSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required',
  }),
  email: Joi.string().trim().email().required().messages({
    'string.email': 'Please use a valid email',
    'string.empty': 'Email is required',
    'any.required': 'Email is required',
  }),
  password: Joi.string().trim().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'string.empty': 'Password is required',
    'any.required': 'Password is required',
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().trim().email().required().messages({
    'string.email': 'Please use a valid email',
    'string.empty': 'Email is required',
    'any.required': 'Email is required',
  }),
  password: Joi.string().trim().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'string.empty': 'Password is required',
    'any.required': 'Password is required',
  }),
});

module.exports = {
  User,
  registerSchema,
  loginSchema,
};
