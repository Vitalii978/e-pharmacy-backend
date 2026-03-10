// // middlewares/validateBody.js
// // Проверяет тело запроса (req.body) перед тем, как отдать контроллеру

// const { HttpError } = require('../utilits'); // обрати внимание - utilits!

// // validateBody - это функция, которая принимает schema (правила проверки)
// const validateBody = schema => {
//   // Она возвращает middleware функцию
//   return (req, res, next) => {
//     // В req.body лежат данные, которые прислал фронтенд
//     // schema.validate - метод Joi для проверки данных
//     const { error } = schema.validate(req.body);

//     // Если есть ошибка валидации
//     if (error) {
//       // error.message выглядит как: '"email" must be a valid email'
//       // Создаем ошибку 400 (Bad Request) с этим сообщением
//       return next(HttpError(400, error.message));
//     }

//     // Если ошибок нет - идем дальше к контроллеру
//     next();
//   };
// };

// module.exports = validateBody;

// middlewares/validateBody.js
// Проверяет тело запроса (req.body) перед передачей в контроллер

const { HttpError } = require('../utilits');

// validateBody принимает схему валидации (например, registerSchema)
const validateBody = schema => {
  // Возвращает middleware функцию
  return (req, res, next) => {
    console.log('🔍 Проверяем данные:', req.body);

    // Проверяем данные по схеме
    const { error } = schema.validate(req.body);

    // Если есть ошибка валидации
    if (error) {
      console.log('❌ Ошибка валидации:', error.message);

      // Создаем ошибку 400 с сообщением от Joi
      return next(HttpError(400, error.message));
    }

    console.log('✅ Данные прошли валидацию');
    // Если всё хорошо - идем дальше к контроллеру
    next();
  };
};

module.exports = validateBody;
