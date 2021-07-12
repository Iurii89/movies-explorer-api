const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const loginValidator = celebrate({
  body: Joi.object().keys({
    password: Joi.string().required().min(8),
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }

      return helpers.message('Невалидный email');
    }),
  }).unknown(true),
});

module.exports = loginValidator;
