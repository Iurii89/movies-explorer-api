const { NotFound } = require('../errors');

const pageNotFound = (req, res, next) => {
  const error = new NotFound('Запрашиваемая страница не найдена');
  return next(error);
};

module.exports = pageNotFound;
