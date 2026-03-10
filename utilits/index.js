// utilits/index.js
// Собираем все helpers в одном месте для удобного импорта

const HttpError = require('./HttpError');
const ctrlWrapper = require('./ctrlWrapper');

module.exports = {
  HttpError,
  ctrlWrapper,
};
