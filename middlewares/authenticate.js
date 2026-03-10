// middlewares/authenticate.js
// Проверяет, залогинен ли пользователь

const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
const { HttpError } = require('../utilits');

const { JWT_SECRET } = process.env; // секретный ключ из .env

const authenticate = async (req, res, next) => {
  // 1. Получаем заголовок Authorization
  // Он выглядит так: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  const authHeader = req.headers.authorization;

  // Если заголовка нет - сразу ошибка
  if (!authHeader) {
    return next(HttpError(401, 'Authorization header not found'));
  }

  // 2. Разбиваем строку на части
  // "Bearer token" -> ["Bearer", "token"]
  const [bearer, token] = authHeader.split(' ');

  // 3. Проверяем, что первое слово - "Bearer"
  if (bearer !== 'Bearer') {
    return next(HttpError(401, 'Invalid authorization format'));
  }

  // 4. Проверяем, что токен есть
  if (!token) {
    return next(HttpError(401, 'Token not found'));
  }

  try {
    // 5. Расшифровываем токен
    // jwt.verify проверяет подпись и возвращает данные, которые мы положили в токен
    // В токен мы клали { id: user._id }
    const { id } = jwt.verify(token, JWT_SECRET);

    // 6. Ищем пользователя по id
    const user = await User.findById(id);

    // 7. Проверяем, что пользователь существует и токен совпадает
    if (!user || !user.token || user.token !== token) {
      return next(HttpError(401, 'User not found or invalid token'));
    }

    // 8. Всё хорошо - добавляем пользователя в req
    // Теперь во всех следующих middleware и контроллерах
    // у нас будет req.user с данными пользователя
    req.user = user;

    // 9. Идем дальше
    next();
  } catch (error) {
    // Если jwt.verify выдал ошибку (токен просрочен или поддельный)
    next(HttpError(401, 'Invalid token'));
  }
};

module.exports = authenticate;
