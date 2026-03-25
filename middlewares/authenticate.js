const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
const { HttpError } = require('../utilits');

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(HttpError(401, 'Authorization header not found'));
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer') {
    return next(HttpError(401, 'Invalid authorization format'));
  }

  if (!token) {
    return next(HttpError(401, 'Token not found'));
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      return next(HttpError(401, 'User not found or invalid token'));
    }

    req.user = user;

    next();
  } catch (error) {
    next(HttpError(401, 'Invalid token'));
  }
};

module.exports = authenticate;
