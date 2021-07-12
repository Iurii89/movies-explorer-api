const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../errors');

const { JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new Unauthorized('Аутентификация не пройдена: нет токена');
  }

  const token = authorization.replace('Bearer ', '');
  try {
    const playload = jwt.verify(token, process.env.NODE_ENV === 'production' ? JWT_SECRET : 'none');
    req.user = playload;
  } catch (err) {
    throw new Unauthorized('Ошибка авторизации: неверный токен');
  }
  next();
};

module.exports = auth;
