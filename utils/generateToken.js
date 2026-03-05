// Подключаем библиотеку для создания токенов
const jwt = require('jsonwebtoken');

// Функция, которая создает токен для пользователя
// Принимает id пользователя, возвращает токен
const generateToken = id => {
  // jwt.sign - создает подписанный токен
  // { id } - данные, которые мы "зашиваем" в токен
  // process.env.JWT_SECRET - секретный ключ (никому не говорим!)
  // expiresIn: '7d' - токен действует 7 дней
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

module.exports = generateToken;

// Объяснение:

// jwt.sign() - создает JWT токен

// { id } - данные, которые зашифрованы в токене (payload)

// process.env.JWT_SECRET - секретный ключ для подписи

// expiresIn: '1d' - токен действует 7 дней
