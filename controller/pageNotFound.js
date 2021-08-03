const { NotFound } = require('../errors');
const { pageNotFoundMessage } = require('../static/errorMessage');

const pageNotFound = (req, res, next) => {
  const error = new NotFound(pageNotFoundMessage);
  return next(error);
};

module.exports = pageNotFound;
