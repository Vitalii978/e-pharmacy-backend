// utilits/HttpError.js
// Объект с сообщениями для разных статусов
const errorMessages = {
  400: 'Bad request', // Неправильный запрос (например, не заполнил поле)
  401: 'Unauthorized', // Не авторизован (нет токена)
  403: 'Forbidden', // Запрещено (нет прав)
  404: 'Not found', // Не найдено
  409: 'Conflict', // Конфликт (например, email уже есть)
  500: 'Server error', // Ошибка сервера
};

// Это функция, которая создает ошибку с HTTP статусом
const HttpError = (status, message = errorMessages[status]) => {
  // 1. Создаем обычную ошибку JavaScript
  // new Error('текст') - создает объект ошибки
  const error = new Error(message);

  // 2. Добавляем к этой ошибке свойство status
  // Теперь у ошибки есть и message, и status
  error.status = status;

  // 3. Возвращаем эту ошибку
  return error;
};

module.exports = HttpError;
