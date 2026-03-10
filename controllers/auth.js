// // controllers/auth.js
// // Здесь будут все функции для работы с пользователями:
// // регистрация, логин, выход, получение информации

// const bcrypt = require('bcrypt'); // для шифрования паролей
// const jwt = require('jsonwebtoken'); // для создания токенов
// const { User } = require('../models/User'); // модель пользователя
// const { HttpError, ctrlWrapper } = require('../utilits'); // наши утилиты

// const { JWT_SECRET } = process.env; // секретный ключ из .env

// // 1. Функция для регистрации
// const register = async (req, res) => {
//   // req.body - это данные, которые прислал фронтенд
//   const { email, password, name } = req.body;

//   // Проверяем, есть ли уже пользователь с таким email
//   const existingUser = await User.findOne({ email });

//   // Если есть - выбрасываем ошибку 409 (Conflict)
//   if (existingUser) {
//     throw HttpError(409, 'Email in use');
//   }

//   // Хешируем (шифруем) пароль
//   // 10 - это сложность шифрования (чем больше, тем надежнее, но медленнее)
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // Создаем нового пользователя в базе данных
//   const newUser = await User.create({
//     name,
//     email,
//     password: hashedPassword, // сохраняем зашифрованный пароль!
//   });

//   // Отправляем ответ (201 - Created)
//   // Не отправляем пароль обратно!
//   res.status(201).json({
//     name: newUser.name,
//     email: newUser.email,
//     message: 'Registration successful',
//   });
// };

// // 2. Функция для логина (входа)
// const login = async (req, res) => {
//   const { email, password } = req.body;

//   // Ищем пользователя по email
//   const user = await User.findOne({ email });

//   // Если пользователь не найден - ошибка 401 (Unauthorized)
//   if (!user) {
//     throw HttpError(401, 'Email or password wrong');
//   }

//   // Сравниваем пароль из запроса с паролем в базе
//   const passwordCompare = await bcrypt.compare(password, user.password);

//   // Если пароли не совпадают - ошибка 401
//   if (!passwordCompare) {
//     throw HttpError(401, 'Email or password wrong');
//   }

//   // Создаем токен
//   // В токен кладем id пользователя (чтобы потом понять, кто это)
//   const payload = { id: user._id };

//   // Подписываем токен секретным ключом
//   // Токен будет действителен 23 часа
//   const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '23h' });

//   // Сохраняем токен в базе данных
//   // Теперь мы знаем, что этот пользователь залогинен
//   await User.findByIdAndUpdate(user._id, { token });

//   // Отправляем ответ с токеном и данными пользователя
//   res.json({
//     token,
//     name: user.name,
//     email: user.email,
//     _id: user._id,
//   });
// };

// // 3. Функция для получения информации о пользователе
// const getUserInfo = async (req, res) => {
//   // req.user приходит из middleware authenticate
//   // Мы его еще создадим позже
//   const { email, name, _id } = req.user;

//   res.json({ _id, email, name });
// };

// // 4. Функция для выхода из системы
// const logout = async (req, res) => {
//   const { _id } = req.user;

//   // Удаляем токен из базы - пользователь больше не залогинен
//   await User.findByIdAndUpdate(_id, { token: '' });

//   res.json({ message: 'Logout success' });
// };

// // Экспортируем все функции, обернутые в ctrlWrapper
// // ctrlWrapper ловит ошибки и передает их в обработчик
// module.exports = {
//   register: ctrlWrapper(register),
//   login: ctrlWrapper(login),
//   getUserInfo: ctrlWrapper(getUserInfo),
//   logout: ctrlWrapper(logout),
// };

// controllers/auth.js
// Здесь будут все функции для работы с пользователями

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
const { HttpError, ctrlWrapper } = require('../utilits');

const { JWT_SECRET } = process.env;

// ========== РЕГИСТРАЦИЯ ==========
const register = async (req, res) => {
  console.log('📝 Регистрируем пользователя:', req.body.email);

  const { email, password, name } = req.body;

  // 1. Проверяем, есть ли пользователь с таким email
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    console.log('❌ Email уже используется:', email);
    throw HttpError(409, 'Email in use');
  }

  // 2. Хешируем пароль
  console.log('🔐 Хешируем пароль...');
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Создаем пользователя
  console.log('💾 Создаем пользователя в базе...');
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  console.log('✅ Пользователь создан с ID:', newUser._id);

  // 4. Отправляем ответ (201 - Created)

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    message: 'Registration successful',
  });
};

// ========== ЛОГИН ==========
const login = async (req, res) => {
  console.log('🔑 Логин пользователя:', req.body.email);

  const { email, password } = req.body;

  // 1. Ищем пользователя
  const user = await User.findOne({ email });

  if (!user) {
    console.log('❌ Пользователь не найден:', email);
    throw HttpError(401, 'Email or password wrong');
  }

  // 2. Проверяем пароль
  console.log('🔐 Проверяем пароль...');
  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    console.log('❌ Неправильный пароль');
    throw HttpError(401, 'Email or password wrong');
  }

  // 3. Создаем JWT токен
  console.log('🎫 Создаем токен...');
  const payload = { id: user._id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '23h' });

  // 4. Сохраняем токен в базе (чтобы знать, что пользователь залогинен)
  await User.findByIdAndUpdate(user._id, { token });
  console.log('✅ Токен сохранен, пользователь залогинен');

  // 5. Отправляем ответ с токеном
  res.json({
    token,
    name: user.name,
    email: user.email,
    _id: user._id,
  });
};

// ========== ПОЛУЧИТЬ ИНФОРМАЦИЮ О ПОЛЬЗОВАТЕЛЕ ==========
const getUserInfo = async (req, res) => {
  console.log('👤 Запрос информации о пользователе:', req.user.email);

  // req.user приходит из authenticate middleware
  const { email, name, _id } = req.user;
  res.json({ _id, email, name });
};

// ========== ВЫХОД ==========
const logout = async (req, res) => {
  console.log('🚪 Выход пользователя:', req.user.email);

  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });

  console.log('✅ Токен удален, выход выполнен');
  res.json({ message: 'Logout success' });
};

// Экспортируем все функции, обернутые в ctrlWrapper
module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getUserInfo: ctrlWrapper(getUserInfo),
  logout: ctrlWrapper(logout),
};
