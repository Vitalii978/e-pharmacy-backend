// utilits/ctrlWrapper.js
// Обертка для контроллеров, чтобы не писать try/catch в каждом

// ctrlWrapper - это функция, которая принимает другую функцию (контроллер)
const ctrlWrapper = controller => {
  // Она возвращает НОВУЮ функцию
  return async (req, res, next) => {
    // У этой новой функции есть try/catch
    try {
      // Пытаемся выполнить контроллер, который нам передали
      await controller(req, res, next);
    } catch (error) {
      // Если в контроллере произошла ошибка (например, throw HttpError)
      // Мы передаем её в next - специальную функцию express
      // next отправит ошибку в обработчик ошибок
      next(error);
    }
  };
};

module.exports = ctrlWrapper;
