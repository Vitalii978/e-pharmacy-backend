const { HttpError } = require('../utilits');

const validateBody = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return next(HttpError(400, error.message));
    }

    console.log('✅ Данные прошли валидацию');
    next();
  };
};

module.exports = validateBody;
