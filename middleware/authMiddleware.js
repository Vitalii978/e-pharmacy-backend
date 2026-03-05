const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Функция-охранник
const protect = async (req, res, next) => {
  let token;

  // Проверяем заголовок Authorization
  // Он должен выглядеть так: "Bearer eyJhbGciOiJIUzI1NiIs..."
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Получаем токен (убираем слово "Bearer")
      token = req.headers.authorization.split(' ')[1];

      // Проверяем токен (если он поддельный - будет ошибка)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Находим пользователя по id из токена
      // .select('-password') - не включаем пароль в результат
      req.user = await User.findById(decoded.id).select('-password');

      // next() - пропускаем дальше (к функции, которая обрабатывает запрос)
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
  }
};

module.exports = { protect };
