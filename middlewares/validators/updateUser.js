const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    password: Joi.string().required().min(8),
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }

      return helpers.message('Невалидный email');
    }),
  }).unknown(true),
});

module.exports = updateUserValidator;
