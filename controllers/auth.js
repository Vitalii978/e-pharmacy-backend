const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
const { HttpError, ctrlWrapper } = require('../utilits');

const { JWT_SECRET } = process.env;

const register = async (req, res) => {
  const { email, password, name } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw HttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    message: 'Registration successful',
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, 'Email or password wrong');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, 'Email or password wrong');
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '23h' });

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    name: user.name,
    email: user.email,
    _id: user._id,
  });
};

const getUserInfo = async (req, res) => {
  const { email, name, _id } = req.user;
  res.json({ _id, email, name });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });

  res.json({ message: 'Logout success' });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getUserInfo: ctrlWrapper(getUserInfo),
  logout: ctrlWrapper(logout),
};
