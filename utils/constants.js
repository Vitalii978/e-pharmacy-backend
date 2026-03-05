// @ts-nocheck
// Константы для всего приложения

// Роли пользователей (пока только одна, но на будущее)
const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

// HTTP статус коды
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
};

// Сообщения об ошибках
const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  USER_NOT_FOUND: 'User not found',
  EMAIL_EXISTS: 'User with this email already exists',
  UNAUTHORIZED: 'No token provided',
  INVALID_TOKEN: 'Invalid or expired token',
};

module.exports = {
  ROLES,
  HTTP_STATUS,
  ERROR_MESSAGES,
};
