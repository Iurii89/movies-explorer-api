const { celebrate, Joi } = require('celebrate');

const deleteMoviesValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }).unknown(true),
});

module.exports = deleteMoviesValidator;
